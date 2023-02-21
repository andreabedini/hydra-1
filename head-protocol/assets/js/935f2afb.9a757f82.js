"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"defaultSidebar":[{"type":"category","label":"Getting Started","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Installation","href":"/head-protocol/docs/getting-started/installation","docId":"getting-started/installation"},{"type":"link","label":"QuickStart","href":"/head-protocol/docs/getting-started/quickstart","docId":"getting-started/quickstart"},{"type":"category","label":"Demo","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"With Docker","href":"/head-protocol/docs/getting-started/demo/with-docker","docId":"getting-started/demo/with-docker"},{"type":"link","label":"Without Docker","href":"/head-protocol/docs/getting-started/demo/without-docker","docId":"getting-started/demo/without-docker"}],"href":"/head-protocol/docs/getting-started/demo/"},{"type":"category","label":"Detailed demo","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Intro","href":"/head-protocol/docs/getting-started/detailed_demo/intro","docId":"getting-started/detailed_demo/intro"},{"type":"link","label":"Protocol outline","href":"/head-protocol/docs/getting-started/detailed_demo/protocol-outline","docId":"getting-started/detailed_demo/protocol-outline"},{"type":"category","label":"Using Hydra","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Preliminaries","href":"/head-protocol/docs/getting-started/detailed_demo/using_hydra/using-hydra-part-1","docId":"getting-started/detailed_demo/using_hydra/using-hydra-part-1"},{"type":"link","label":"Setup","href":"/head-protocol/docs/getting-started/detailed_demo/using_hydra/using-hydra-part-2","docId":"getting-started/detailed_demo/using_hydra/using-hydra-part-2"},{"type":"link","label":"Running","href":"/head-protocol/docs/getting-started/detailed_demo/using_hydra/using-hydra-part-3","docId":"getting-started/detailed_demo/using_hydra/using-hydra-part-3"}]}],"href":"/head-protocol/docs/getting-started/detailed_demo/"},{"type":"link","label":"Hydra development","href":"/head-protocol/docs/getting-started/developing-on-hydra","docId":"getting-started/developing-on-hydra"},{"type":"link","label":"Glossary","href":"/head-protocol/docs/getting-started/glossary","docId":"getting-started/glossary"},{"type":"link","label":"Troubleshooting","href":"/head-protocol/docs/getting-started/troubleshooting","docId":"getting-started/troubleshooting"}],"href":"/head-protocol/docs/getting-started/"},{"type":"link","label":"Haskell Packages","href":"/head-protocol/docs/haskell_packages","docId":"haskell_packages"}]},"docs":{"getting-started/demo/index":{"id":"getting-started/demo/index","title":"Demo","description":"Our standard demo setup for demonstrating the Hydra Head protocol.","sidebar":"defaultSidebar"},"getting-started/demo/with-docker":{"id":"getting-started/demo/with-docker","title":"With Docker","description":"We\'ll be using Docker and compose to get the demo running, so make sure you have them in scope or, jump right away to Running The Demo: Without Docker if you feel like doing it the hard way.","sidebar":"defaultSidebar"},"getting-started/demo/without-docker":{"id":"getting-started/demo/without-docker","title":"Without Docker","description":"Running the demo without Docker containers, but with plain executables and scripts.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/index":{"id":"getting-started/detailed_demo/index","title":"Detailed example","description":"This document is written in October 2022 and is based on hydra version 0.8.0, the current version of hydra may differ from the description below. This example is intended as educational and no good practices can be derived from it.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/intro":{"id":"getting-started/detailed_demo/intro","title":"Intro","description":"In this tutorial, we will discuss the current implementation of the Hydra proof of concept implementation. This decentralized application aims to create a fast isomorphic state channel on the Cardano blockchain. What this precisely means will be discussed later. Before we start, we will provide some context to further build upon. After that, we will summarize the Hydra protocol in more detail.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/protocol-outline":{"id":"getting-started/detailed_demo/protocol-outline","title":"Protocol outline","description":"In this section, we will discuss a high-level overview of the different stages of the Hydra protocol and its life cycle. We assume that everything goes accordingly, by which we mean that during all steps  of the protocol, all parties are online and do not have a dispute. The cycle can be defined in the following four stages.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/using_hydra/using-hydra-part-1":{"id":"getting-started/detailed_demo/using_hydra/using-hydra-part-1","title":"Preliminaries","description":"In this section, we will showcase the usage of the hydra implementation. Below we will show detailed usages of the main components, these consist of the Hydra node and the usage of the associated API it exposes.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/using_hydra/using-hydra-part-2":{"id":"getting-started/detailed_demo/using_hydra/using-hydra-part-2","title":"Setup","description":"To showcase the protocol, we consider a minimal setup of two participants that together want to open a hydra head, call these two Bob and Alice. To start, we enter a nix-shell in the hydra repo and create a directory to hold some setup files.","sidebar":"defaultSidebar"},"getting-started/detailed_demo/using_hydra/using-hydra-part-3":{"id":"getting-started/detailed_demo/using_hydra/using-hydra-part-3","title":"Running","description":"Opening a head","sidebar":"defaultSidebar"},"getting-started/developing-on-hydra":{"id":"getting-started/developing-on-hydra","title":"Hydra development","description":"This guide is meant to be a tutorial on how to develop an application on Hydra. It will assume the reader is already familiar with developing a DApp on Cardano and will focus on the differences between the two.","sidebar":"defaultSidebar"},"getting-started/glossary":{"id":"getting-started/glossary","title":"Glossary","description":"Contestation Period","sidebar":"defaultSidebar"},"getting-started/index":{"id":"getting-started/index","title":"Getting Started","description":"","sidebar":"defaultSidebar"},"getting-started/installation":{"id":"getting-started/installation","title":"Installation","description":"Where to get Hydra from?","sidebar":"defaultSidebar"},"getting-started/quickstart":{"id":"getting-started/quickstart","title":"QuickStart","description":"Your first steps with a hydra-node.","sidebar":"defaultSidebar"},"getting-started/troubleshooting":{"id":"getting-started/troubleshooting","title":"Troubleshooting","description":"Known issues","sidebar":"defaultSidebar"},"haskell_packages":{"id":"haskell_packages","title":"Haskell Packages","description":"The Hydra project is divided into several Haskell packages fulfilling different parts of the protocol. While some packages are internal and specific to the Hydra project, some are quite generic and may be useful to other projects facing similar issues. Regardless, we expose Haddock documentation for all of them.","sidebar":"defaultSidebar"}}}')}}]);