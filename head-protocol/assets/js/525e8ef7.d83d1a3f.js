"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2037],{9257:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(7294),o=n(1736);const i="terminalWindow_wGrl",r="terminalWindowHeader_o9Cs",d="terminalWindowBody_tzdS",l="buttons_IGLB",s="dot_fGZE";function c(e){let{children:t,minHeight:n}=e;const c="string"==typeof t?a.createElement(o.Z,null,t):t;return a.createElement("div",{className:i,style:{minHeight:n}},a.createElement("div",{className:r},a.createElement("div",{className:l},a.createElement("span",{className:s,style:{background:"#f25f58"}}),a.createElement("span",{className:s,style:{background:"#fbbe3c"}}),a.createElement("span",{className:s,style:{background:"#58cb42"}}))),a.createElement("div",{className:d},c))}},7989:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>k,default:()=>b,frontMatter:()=>h,metadata:()=>v,toc:()=>y});var a=n(7462),o=n(7294),i=n(3905),r=n(9257),d=n(2389),l=n(650),s=n(6010);const c="tabItem_LplD";function p(e){var t,n;const{lazy:i,block:r,defaultValue:d,values:p,groupId:m,className:u}=e,h=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),k=p??h.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),v=(0,l.lx)(k,((e,t)=>e.value===t.value));if(v.length>0)throw new Error(`Docusaurus error: Duplicate values "${v.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===d?d:d??(null==(t=h.find((e=>e.props.default)))?void 0:t.props.value)??(null==(n=h[0])?void 0:n.props.value);if(null!==g&&!k.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${k.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:N}=(0,l.UB)(),[b,w]=(0,o.useState)(g),f=[],{blockElementScrollPositionUntilNextRender:T}=(0,l.o5)();if(null!=m){const e=y[m];null!=e&&e!==b&&k.some((t=>t.value===e))&&w(e)}const C=e=>{const t=e.currentTarget,n=f.indexOf(t),a=k[n].value;a!==b&&(T(t),w(a),null!=m&&N(m,a))},x=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=f.indexOf(e.currentTarget)+1;n=f[t]||f[0];break}case"ArrowLeft":{const t=f.indexOf(e.currentTarget)-1;n=f[t]||f[f.length-1];break}}null==(t=n)||t.focus()};return o.createElement("div",{className:"tabs-container"},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},u)},k.map((e=>{let{value:t,label:n,attributes:i}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,key:t,ref:e=>f.push(e),onKeyDown:x,onFocus:C,onClick:C},i,{className:(0,s.Z)("tabs__item",c,null==i?void 0:i.className,{"tabs__item--active":b===t})}),n??t)}))),i?(0,o.cloneElement)(h.filter((e=>e.props.value===b))[0],{className:"margin-vert--md"}):o.createElement("div",{className:"margin-vert--md"},h.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==b})))))}function m(e){const t=(0,d.Z)();return o.createElement(p,(0,a.Z)({key:String(t)},e))}function u(e){let{children:t,hidden:n,className:a}=e;return o.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}const h={sidebar_position:3},k="Without Docker",v={unversionedId:"getting-started/demo/without-docker",id:"getting-started/demo/without-docker",title:"Without Docker",description:"Running the demo without Docker containers, but with plain executables and scripts.",source:"@site/docs/getting-started/demo/without-docker.md",sourceDirName:"getting-started/demo",slug:"/getting-started/demo/without-docker",permalink:"/head-protocol/docs/getting-started/demo/without-docker",editUrl:"https://github.com/input-output-hk/hydra/tree/master/docs/docs/getting-started/demo/without-docker.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"With Docker",permalink:"/head-protocol/docs/getting-started/demo/with-docker"},next:{title:"Detailed example",permalink:"/head-protocol/docs/getting-started/detailed_demo/"}},g={},y=[{value:"Preparation",id:"preparation",level:2},{value:"Setting-up The Chain",id:"setting-up-the-chain",level:2},{value:"Seeding The Network",id:"seeding-the-network",level:2},{value:"Setting-up The Hydra Network",id:"setting-up-the-hydra-network",level:2},{value:"Running The Clients",id:"running-the-clients",level:2}],N={toc:y};function b(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},N,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"without-docker"},"Without Docker"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Running the demo without Docker containers, but with plain executables and scripts.")),(0,i.kt)("h2",{id:"preparation"},"Preparation"),(0,i.kt)("p",null,"Make sure that you have a ",(0,i.kt)("inlineCode",{parentName:"p"},"cardano-node"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"hydra-node")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"hydra-tui")," executable in your scope. You can either"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"use ",(0,i.kt)("inlineCode",{parentName:"li"},"nix develop .#demo")," or"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cabal build")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"cabal exec")," them (do not forget the ",(0,i.kt)("inlineCode",{parentName:"li"},"--")," before passing further arguments).")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Tip for tmux users")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," nix shell, there is a ",(0,i.kt)("inlineCode",{parentName:"p"},"run-tmux")," script which starts a new ",(0,i.kt)("inlineCode",{parentName:"p"},"tmux")," session with multiple windows and panes executing all the commands below!"))),(0,i.kt)("p",null,"All further commands are written as if executed from the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," folder in the project repository, so make sure to ",(0,i.kt)("inlineCode",{parentName:"p"},"cd demo")," before continuing."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Tip for nix-direnv users")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Allowing the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo/.envrc")," will ensure you have the nix shell environment available whenever you are in the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo/")," directory. To use this, opt-in via ",(0,i.kt)("inlineCode",{parentName:"p"},"direnv allow")," after ",(0,i.kt)("inlineCode",{parentName:"p"},"cd demo"),"."))),(0,i.kt)("h2",{id:"setting-up-the-chain"},"Setting-up The Chain"),(0,i.kt)("p",null,"First, let's prepare and start an ad-hoc, single ",(0,i.kt)("inlineCode",{parentName:"p"},"cardano-node")," devnet using our configuration. Note that this will create a ",(0,i.kt)("inlineCode",{parentName:"p"},"devnet")," directory in your current working directory:"),(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"./prepare-devnet.sh\ncd devnet\ncardano-node run \\\n  --config cardano-node.json \\\n  --topology topology.json \\\n  --database-path db \\\n  --socket-path node.socket \\\n  --shelley-operational-certificate opcert.cert \\\n  --shelley-kes-key kes.skey \\\n  --shelley-vrf-key vrf.skey\n"))),(0,i.kt)("h2",{id:"seeding-the-network"},"Seeding The Network"),(0,i.kt)("p",null,"You can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"seed-devnet.sh")," script by passing it the path/command to a cardano-cli and hydra-node executable to use, instead of having it using the Docker container. For example:"),(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"export CARDANO_NODE_SOCKET_PATH=devnet/node.socket\n./seed-devnet.sh $(which cardano-cli) $(which hydra-node)\n"))),(0,i.kt)("p",null,"Note, should you want to use ",(0,i.kt)("inlineCode",{parentName:"p"},"cabal"),", pass the invocation for example like this ",(0,i.kt)("inlineCode",{parentName:"p"},'"cabal exec hydra-node --"'),"."),(0,i.kt)("h2",{id:"setting-up-the-hydra-network"},"Setting-up The Hydra Network"),(0,i.kt)("p",null,"Then, in 3 different terminals, start 3 Hydra nodes from the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo/")," directory:"),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"We are trying to force ipv4 addresses by using ",(0,i.kt)("inlineCode",{parentName:"p"},"--peer 127.0.0.1"),".\nIf you don't see any connected peers in the tui it probably means that your system is configured to use ipv6."))),(0,i.kt)(m,{mdxType:"Tabs"},(0,i.kt)(u,{value:"Alice",mdxType:"TabItem"},(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"source .env && hydra-node \\\n  --node-id 1 --port 5001 --api-port 4001 --monitoring-port 6001 \\\n  --peer 127.0.0.1:5002 \\\n  --peer 127.0.0.1:5003 \\\n  --hydra-signing-key alice.sk \\\n  --hydra-verification-key bob.vk \\\n  --hydra-verification-key carol.vk \\\n  --hydra-scripts-tx-id $HYDRA_SCRIPTS_TX_ID \\\n  --cardano-signing-key devnet/credentials/alice.sk \\\n  --cardano-verification-key devnet/credentials/bob.vk \\\n  --cardano-verification-key devnet/credentials/carol.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/node.socket \\\n  --persistence-dir persistence/alice\n")))),(0,i.kt)(u,{value:"Bob",mdxType:"TabItem"},(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"source .env && hydra-node \\\n  --node-id 2 --port 5002 --api-port 4002 --monitoring-port 6002 \\\n  --peer 127.0.0.1:5001 \\\n  --peer 127.0.0.1:5003 \\\n  --hydra-signing-key bob.sk \\\n  --hydra-verification-key alice.vk \\\n  --hydra-verification-key carol.vk \\\n  --hydra-scripts-tx-id $HYDRA_SCRIPTS_TX_ID \\\n  --cardano-signing-key devnet/credentials/bob.sk \\\n  --cardano-verification-key devnet/credentials/alice.vk \\\n  --cardano-verification-key devnet/credentials/carol.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/node.socket \\\n  --persistence-dir persistence/bob\n")))),(0,i.kt)(u,{value:"Carol",mdxType:"TabItem"},(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"source .env && hydra-node \\\n  --node-id 3 --port 5003 --api-port 4003 --monitoring-port 6003 \\\n  --peer 127.0.0.1:5001 \\\n  --peer 127.0.0.1:5002 \\\n  --hydra-signing-key carol.sk \\\n  --hydra-verification-key alice.vk \\\n  --hydra-verification-key bob.vk \\\n  --hydra-scripts-tx-id $HYDRA_SCRIPTS_TX_ID \\\n  --cardano-signing-key devnet/credentials/carol.sk \\\n  --cardano-verification-key devnet/credentials/alice.vk \\\n  --cardano-verification-key devnet/credentials/bob.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/node.socket \\\n  --persistence-dir persistence/carol\n"))))),(0,i.kt)("p",null,"If things go well, the nodes should start logging once connected to the chain."),(0,i.kt)("h2",{id:"running-the-clients"},"Running The Clients"),(0,i.kt)("p",null,"Connect to the nodes using hydra-tui. For example, to use Alice's hydra-node and her on-chain credentials:"),(0,i.kt)(r.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"hydra-tui \\\n  --connect 0.0.0.0:4001 \\\n  --cardano-signing-key devnet/credentials/alice.sk \\\n  --network-id 42 \\\n  --node-socket devnet/node.socket\n"))),(0,i.kt)("p",null,"Replace port ",(0,i.kt)("inlineCode",{parentName:"p"},"4001")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"4002")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"4003")," to connect to the other 2 nodes and ",(0,i.kt)("inlineCode",{parentName:"p"},"alice.sk")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"bob.sk")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"carol.sk")," respectively."))}b.isMDXComponent=!0}}]);