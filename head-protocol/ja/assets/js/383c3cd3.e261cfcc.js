"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2465],{9257:(t,e,a)=>{a.d(e,{Z:()=>c});var o=a(7294),n=a(1736);const i="terminalWindow_wGrl",s="terminalWindowHeader_o9Cs",h="terminalWindowBody_tzdS",r="buttons_IGLB",l="dot_fGZE";function c(t){let{children:e,minHeight:a}=t;const c="string"==typeof e?o.createElement(n.Z,null,e):e;return o.createElement("div",{className:i,style:{minHeight:a}},o.createElement("div",{className:s},o.createElement("div",{className:r},o.createElement("span",{className:l,style:{background:"#f25f58"}}),o.createElement("span",{className:l,style:{background:"#fbbe3c"}}),o.createElement("span",{className:l,style:{background:"#58cb42"}}))),o.createElement("div",{className:h},c))}},4337:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>r,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>h,toc:()=>l});var o=a(7462),n=(a(7294),a(3905));a(9257);const i={sidebar_position:3},s="Protocol outline",h={unversionedId:"getting-started/detailed_demo/protocol-outline",id:"getting-started/detailed_demo/protocol-outline",title:"Protocol outline",description:"In this section, we will discuss a high-level overview of the different stages of the Hydra protocol and its life cycle. We assume that everything goes accordingly, by which we mean that during all steps  of the protocol, all parties are online and do not have a dispute. The cycle can be defined in the following four stages.",source:"@site/docs/getting-started/detailed_demo/protocol-outline.md",sourceDirName:"getting-started/detailed_demo",slug:"/getting-started/detailed_demo/protocol-outline",permalink:"/head-protocol/ja/docs/getting-started/detailed_demo/protocol-outline",editUrl:"https://github.com/input-output-hk/hydra/tree/master/docs/docs/getting-started/detailed_demo/protocol-outline.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"Intro",permalink:"/head-protocol/ja/docs/getting-started/detailed_demo/intro"},next:{title:"Preliminaries",permalink:"/head-protocol/ja/docs/getting-started/detailed_demo/using_hydra/using-hydra-part-1"}},r={},l=[{value:"Initializing",id:"initializing",level:2},{value:"Opening",id:"opening",level:2},{value:"Closing",id:"closing",level:2},{value:"Finalizing",id:"finalizing",level:2}],c={toc:l};function d(t){let{components:e,...i}=t;return(0,n.kt)("wrapper",(0,o.Z)({},c,i,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"protocol-outline"},"Protocol outline"),(0,n.kt)("p",null,"In this section, we will discuss a high-level overview of the different stages of the Hydra protocol and its life cycle. We assume that everything goes accordingly, by which we mean that during all steps  of the protocol, all parties are online and do not have a dispute. The cycle can be defined in the following four stages."),(0,n.kt)("h2",{id:"initializing"},"Initializing"),(0,n.kt)("p",null,"In this stage, the foundation of the protocol is laid. It all starts with a group of parties that together want to run an instance of a hydra head. A few things need to be determined before they can start a secure execution of the protocol."),(0,n.kt)("p",null,"Firstly, the parties need to communicate some basic things with each other. They each share the following things"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"An IP address + port of their machine that will run the Hydra node."),(0,n.kt)("li",{parentName:"ul"},"A Hydra verification key to identify them in the head."),(0,n.kt)("li",{parentName:"ul"},"A Cardano verification key to identify them on the blockchain."),(0,n.kt)("li",{parentName:"ul"},"Agree on the protocol parameters that they want to use in the Hydra head. ")),(0,n.kt)("p",null,"The IP address and the port is needed so that other parties know how to establish a secure pairwise communication channel with each other. We leave out here what a secure connection entails. The two keys are needed to ensure that parties are cryptographically identified on the blockchain and in the Hydra head. And lastly, all participants need to reach an agreement on the used protocol parameters that will be used inside the head. More details will follow on all these four things."),(0,n.kt)("p",null,"Then, once each of the parties has the above information about the other parties, they each can start their Hydra node. This will establish a communication channel for the rest of the protocol execution."),(0,n.kt)("p",null,"Via this communication channel, one party can start the protocol by posting an ",(0,n.kt)("strong",{parentName:"p"},"initialization")," transaction on the blockchain. This transaction is made to a smart contract that keeps track of the identification keys describes above of the parties. This action is then observed by the other parties on the blockchain, they confirm this transaction and use this contract to join the protocol. They join by ",(0,n.kt)("strong",{parentName:"p"},"committing")," funds that they have to this contract. Here, the contract keeps track of what funds were put in by which party by linking the funds to their verification key. This in case that the protocol is aborted before the head is opened, so that each can reclaim their funds."),(0,n.kt)("h2",{id:"opening"},"Opening"),(0,n.kt)("p",null,"In this stage, the core of the protocol, which gives us the scalability properties, is run. After all parties have committed to the contract, any party can post a transaction on the blockchain to open the head. To do so they ",(0,n.kt)("strong",{parentName:"p"},"collect")," all the funds committed and combine them in the contract, the head is now open."),(0,n.kt)("p",null,"From this point, the committed funds by each party are represented in the hydra head as the initial snapshot. Remember that Hydra is an isomorphic state channel, this means it behaves and looks similar to the layer one blockchain. That is why these snapshots keep track of the state using the EUTxO model. More explicit, each snapshot consists of at least these things"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"a number to indicate its order regarding other snapshots."),(0,n.kt)("li",{parentName:"ul"},"a commitment to a collection of UTxO's that represent the state of the head."),(0,n.kt)("li",{parentName:"ul"},"The signatures of all parties.")),(0,n.kt)("p",null,"With each new transaction, the collection of UTxO's changes and a new snapshot is made. The time that it takes to perform this snapshot is dependent on the size of the UTxO collection, the number of parties in the head and their communication time. But, note that this time is certainly less than the 20 seconds per block. Also, note that the entire UTxO's collection is stored in the snapshot. Since the total size of the head might get gigantic as it is used, the commitment to a particular collection is stored instead. This is done via Merkle tree's, a computer science data structure that allows you to prove that a UTxO is part of the commitment without storing it in full."),(0,n.kt)("h2",{id:"closing"},"Closing"),(0,n.kt)("p",null,"In this stage, the parties are done with their transactions in the head and want to close it. During the previous stage, they all gathered multiple ordered snapshots, each index by an increasing number. With these snapshots, any party can close the head at any time, they do this by making a transaction on the layer one blockchain that notifies the contract that they want to close the head. More detailed, they notify the contract of their last perceived known snapshot."),(0,n.kt)("p",null,"The other parties see this transaction happen on the blockchain and check with the snapshot number that this snapshot is also their last perceived snapshot. If not, they have some time to ",(0,n.kt)("strong",{parentName:"p"},"contest")," to that snapshot by providing a newer snapshot to the contract. The time they have is given as a parameter in the initialization phase."),(0,n.kt)("p",null,"Notice that no party can cheat and can publish an old snapshot, as any of the other parties can contest to that intermediate snapshot."),(0,n.kt)("h2",{id:"finalizing"},"Finalizing"),(0,n.kt)("p",null,"In this stage, the head is closed, but the initial funds are still at the contract. To distribute these funds, the contract needs to ",(0,n.kt)("strong",{parentName:"p"},"fanout")," the collected UTxOs from the commitment phase given the latest snapshot. From the latest snapshot, the commitment to a collection of UTxO's can be extracted. Each party can use this Merkelised data structure to prove that an UTxO that they owned in the head is part of it of the commitment. The contract then allows parties to extract UTxO's from the contract to the associated address that corresponds to UTxO as in the Merkle Tree."),(0,n.kt)("p",null,"It is important to note here that value cannot be created at this fanout stage with respect to the commitment phase. Though native assets can be used and committed in a head (it's an isomorphic state channel), the creation of new ones in a head cannot be fanned out. This is because the mainchain has no scope on any transactions in a head, so in particular, the layer one is oblivious to any (in)correct execution of a minting policy in the head. So in conclusion, the value that enters a head in the commitment phase equals the value extracted in the fanout phase. As a concluding overview, the four stages above give the following diagram."),(0,n.kt)("p",null,(0,n.kt)("img",{loading:"lazy",alt:"hydra-head-lifecycle",src:a(5270).Z,width:"960",height:"540"})))}d.isMDXComponent=!0},5270:(t,e,a)=>{a.d(e,{Z:()=>o});const o=a.p+"assets/images/hydra-head-lifecycle-b8449385e9041a214bf8c6e52830de3c.svg"}}]);