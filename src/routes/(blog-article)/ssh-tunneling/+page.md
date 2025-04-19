---
title: "Connecting Networks Together: A Guide to SSH Forwarding"
slug: ssh-tunneling
coverImage: ""
excerpt: ""
date: 2025-04-18T16:42:45.871Z
updated: null
hidden: false
tags: []
keywords: []
---

<script>
  import Callout from "$lib/components/molecules/Callout.svelte";
  import CodeBlock from "$lib/components/molecules/CodeBlock.svelte";
</script>

As developers or system administrators, we often find ourselves needing to connect networks together ad-hoc style for a brief period of time. While tools like Tailscale or Headscale can make this process extremely easy, they may not be necessary for smaller-scale, ephemeral connections. In this post, I'll show you how to use SSH forwards (reverse, local, and dynamic) to quickly connect two networks together.

## Setting up an SSH Reverse Port Forward

An SSH reverse port forward allows you to access a server or machine on the other side of a firewall by forwarding traffic from the remote machine to the local machine or LAN. Here's how to set it up:

1. Open a terminal and run the following command:

<CodeBlock lang="bash">
$ ssh -R 0.0.0.0:8080:localhost:8181 user@remote-machine
</CodeBlock>

Replace `user` with the username you use to log in to the remote machine, and `remote-machine` with the hostname or IP address of the machine you want to host the reverse port forward. 

This sets up an SSH reverse port forward from the remote machine's port 8080 to the local machine's port 8181 (Note: You can replace localhost with another machine on your LAN if you want the remote machine to access another resource on the local machine's network). With this SSH connection, you have the ability to perform NAT traversal with a command that is already included by default on most operating systems! If you have a service running on your local machine on port 8181, you can now access it via the remote machine's port 8080.

<Callout type="warning">
  NOTE: Be aware that by utilizing a reverse port forward, you are exposing the service running on the local port being forwarded to (i.e. 8181 in the previous example) to the entire remote machine's network on the remote port (i.e. 8080 in the previous example). A remote machine with a public IP Address may allow your local port to be accessable from the open internet.
</Callout>

If you are having issues accessing the local machine's service via the remote machine's port, you may also need to navigate to the remote machine and enable `GateWayPorts` in the sshd config. This allows the remote machine to listen on interfaces other than localhost for connections to forward back to the local machine over the ssh connection. To check to see if  `GateWayPorts` are enabled or disabled run the following command:

<Callout type="info">
  NOTE: The following commands are assuming a debian based distribution. If you are running a different OS, you may need to look up the location to the sshd_config file.
</Callout>

<CodeBlock lang="bash">
$ cat /etc/ssh/sshd_config
</CodeBlock>

If you see a line starting with `#GatewayPorts no` or `GatewayPorts no`, edit the `/etc/ssh/sshd_config` file in your favorite editor to `GatewayPorts yes`. You may need to restart the sshd service at this time to allow for the new configuration changes to take effect.

To restart that service via systemd run the following command:

<CodeBlock lang="bash">
$ sudo systemctl restart sshd
</CodeBlock>

## Setting up an SSH Local Port Forward

An SSH local port forward allows you to access a service or application running on a remote machine, or it's network, from your local machine. This is essentially proxying all traffic sent to the local machine port specified through the ssh connection to the remote machine and routed outbound from there. Here's how to set it up:

1. Open a terminal and run the following command:

<CodeBlock lang="bash">
$ ssh -L 8080:remote-endpoint:8181 user@remote-machine
</CodeBlock>

Replace `user` with the username you use to log in to the remote machine, `remote-machine` with the hostname or IP address of the machine you want to proxy traffic through, and `remote-endpoint` with the hostname or IP address of the machine hosting the service on port 8181 (NOTE: `remote-endpoint` and `remote-machine` can be the same address but don't have to be). 

This sets up an SSH local port forward from your local machine's port 8080 to the `remote-endpoint` port 8181 proxied over the ssh connection to `remote-machine`. If you now access the local machine's port 8080, the traffic will be forwarded over the ssh connection and sent from `remote-machine` to `remote-endpoint`.

## Setting up an SSH Dynamic Port Forward

In the previous example, we forwarded a local port over an ssh connection to a `remote-endpoint`. While this is particularly useful for one-off port forwards, ssh also has a dynamic port forward that can be utilized in conjunction with `proxychains` (more on that below) to dynamically route traffic over the ssh connection to **many** `remote-endpoint`s and ports. Here is how to set it up:

1. Open a terminal and run the following command:

<CodeBlock lang="bash">
$ ssh -D 1080 user@remote-machine
</CodeBlock>

Replace `user` with the username you use to log in to the remote machine, and `remote-machine` with the hostname or IP address of the machine you want the proxied traffic to be routed out from.

This sets up an SSH dynamic port forward from your local machine's port 9090 to the remote machine. You can then configure Proxychains (more on that below) to route traffic through this newly created ssh proxy.

### Integrating SSH Dynamic Port Forward with Proxychains

Proxychains is a tool that allows you to route traffic through a proxy, such as the SSH connection set up in the previous example. Here's how to integrate your SSH dynamic port forward with Proxychains:

1. Open a terminal and make sure proxychains is installed:

<CodeBlock lang="bash">
$ sudo apt install proxychains -y
</CodeBlock>

2. Run proxychains to use your SSH dynamic port forward:

<CodeBlock lang="bash">
$ proxychains firefox
</CodeBlock>

<Callout type="info">
 By default on most installations, proxychains default proxy port is set to connect to 127.0.0.1 port 1080 to begin forwarding traffic through the proxy. If this is not the case for your installation, you may need to edit the proxychains config generally located at /etc/proxychains4.conf.
</Callout>

This sets up Proxychains to route traffic through the SSH dynamic port forward for all traffic generated by the provided application (i.e. firefox). With this configuration, all firefox browser traffic will be routed from local machine port 1080, over the ssh connection to `remote-machine`, and routed out of `remote-machine` as an exit node.

## Conclusion

SSH forwards (reverse, local, and dynamic) can be a powerful tool for connecting networks together. By following these steps, you can quickly set up the connections you need without having to expose specific ports on your router or use more complex tools like Tailscale or Headscale. Whether you're working with remote teams or accessing machines behind firewalls, SSH forwards are an essential skill to have in your toolkit.

## BONUS Round

The following is a bash keybind I have created to quickly prompt and set up a reverse port forward from a remote machine to my local machine on a provided port. Try to see if you can utilize it to create an alias for a local port forward!

<CodeBlock lang="bash">
bind '"^Wrs":"read -p \"Remote Port: \" r && read -p \"Local Port: \" l && read -p \"Remote IP: \" ip && ssh -R 0.0.0.0:$r:localhost:$l user@$ip -N -f\n"'
</CodeBlock>