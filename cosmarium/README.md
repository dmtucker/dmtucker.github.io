# Cosmarium

cosmarium.net

## Goals

1. Stability: A well-designed network is highly-available, consistently predictable, and robust in the event of failure.

2. Security: The primary gateway between a sovereign private network and an ISP represents a change in jurisdiction and, therefore, must be able to enforce internal policies effectively.

3. Scalability: A good design (for anything really) will not require revision in the face of growth, and modest growth should be expected with the implementation of the Internet of Things.

4. Simplicity: The fewer moving parts, the fewer opportunities for failure or error.

5. Compatibility: Most devices should be supported.

## Design

### LAN

The network operates over a NETGEAR ProSafe GS-108 (8-port unmanaged gigabit switch).

#### IPv4

Addresses in 192.168.1.0/24 are offered via DHCP.

* There are 3 private address spaces available in IPv4 (10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16), but the 192.168.0.0/16 block is typically used for home networks which generally have smaller address requirements.

  * The 10.0.0.0/8 block is typically used by large companies. Using it for a home network and trying to connect to a company network via VPN can be problematic.

  * The 172.16.0.0/12 block is typically used by small companies which is subject to the same complications described above. Also, Docker uses it for container addresses by default.

* DHCP is the idiomatic address delegation mechanism in IPv4.

##### Local Numbering Policy

* 192.168.1.0xx are staticly assigned (although a DHCP reservation should still be created).

  * Clients do not use DHCP.

* 192.168.1.1xx are dynamically assigned.

  * Clients use DHCP and are *NOT* guaranteed the same address every time the lease is renewed.

* 192.168.1.2xx are dynamically assigned reservations.

  * Clients use DHCP and are guaranteed the same address every time the lease is renewed.

In this way, all clients can be tracked through the DHCP server.

##### DNS

The gateway operates a DNS server that is advertised and configured as DHCP leases are issued.

* Note: This means local hosts are not accesible from the WAN via IPv4 by name.

#### IPv6

Addresses in a dynamic ::/64 (obtained via DHCP-PD from the WAN) are offered via SLAAC.

  * Using DHCP-PD ensures that any address a host ends up with will be globally routable.

  * SLAAC is the idiomatic address delegation mechanism in IPv6.

##### DDNS

DDNS is essentially required for DNS with SLAAC.

The gateway does not accept DDNS updates, nor should it since it is the DNS server for Cosmarium.
It already knows addresses leased via DHCP, and it only forwards requests it doesn't know.
So, when a device on cosmarium.net tries to look up a name, the gateway will respond with a private IPv4 address or it will check global DNS.

As far as global DNS, freedns.afraid.org supports DDNS for both IPv4 and IPv6.
Each device (including the gateway) updates freedns.afraid.org with its IPv6 address periodically.
IPv6 makes more sense for global DNS since it will work on cosmarium.net or not (i.e. it is not subject to the complications of NAT and IP masquerading).

### Gateway

The default gateway is a Ubiquiti EdgeRouter Lite (3-port gigabit router).

#### Firewall

No unsolicited traffic from the WAN is acknowledged at this time except DHCPv6 and ICMPv6.
All other traffic is unrestricted.

#### NAT

Due to the use of a private address space, IPv4 masquerading is enabled on the WAN interface.

* Note: Local hosts are not accessible from the WAN via IPv4.

### WAN

Wave G is the current ISP, and it provides:

* IPv4: 1 address via DHCP

* IPv6: 1+ addresses via SLAAC and 1 ::/60 prefix via DHCP-PD

This is delivered over megabit Ethernet for ~$60/mo.
