(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{5489:(e,t,r)=>{Promise.resolve().then(r.bind(r,8041))},8041:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(5155),a=r(2115);let n=()=>{let[e,t]=(0,a.useState)(null),[r,n]=(0,a.useState)(!1),[l,o]=(0,a.useState)(""),[d,i]=(0,a.useState)(""),[c,x]=(0,a.useState)(""),[m,h]=(0,a.useState)([""]),[u,b]=(0,a.useState)(1);(0,a.useEffect)(()=>{let e=async()=>{try{let e=window.tronWeb;console.log("当前节点:",e.fullNode.host),t(e);let r=await e.trx.getNodeInfo();console.log("节点信息:",r)}catch(e){console.error("连接错误:",e),o("网络连接失败，请检查网络设置")}};(async()=>{let t=0,r=()=>{window.tronWeb&&window.tronWeb.ready?e():t<10?(t++,setTimeout(r,1e3)):o("未检测到TronLink，请确保在TronLink中打开")};r()})()},[]);let g=e=>{let t=m.filter((t,r)=>r!==e);h(t),u>t.length&&b(t.length)},p=(e,t)=>{let r=[...m];r[e]=t,h(r)},w=async()=>{try{if(n(!0),o(""),i(""),!window.tronWeb||!window.tronWeb.ready)throw Error("请确保在TronLink中打开此页面");let e=window.tronWeb;if(!e.isAddress(c))throw Error("被控制地址格式不正确");let t=m.filter(t=>t&&e.isAddress(t));if(t.length<u)throw Error("有效控制地址数量少于所需签名数");let r={owner_address:e.address.toHex(c),owner:{type:0,permission_name:"owner",threshold:u,keys:t.map(t=>({address:e.address.toHex(t),weight:1}))},actives:[{type:2,permission_name:"active",threshold:u,operations:"7fff1fc0033e0300000000000000000000000000000000000000000000000000",keys:t.map(t=>({address:e.address.toHex(t),weight:1}))}]},s=await e.fullNode.request("/wallet/accountpermissionupdate",r,"post"),a=Date.now(),l=s.txID;s.expiration=a+6e4,s.timestamp=a;let d=await e.trx.sign(s);if((await e.trx.sendRawTransaction(d)).result){i("多签权限设置成功! 交易ID: ".concat(l));return}throw Error("交易被拒绝")}catch(e){console.error("错误:",e),o(e.message||"设置失败，请重试")}finally{n(!1)}};return(0,s.jsx)("div",{className:"p-4 bg-gray-50 min-h-screen",children:(0,s.jsx)("div",{className:"max-w-lg mx-auto bg-white rounded-lg shadow",children:(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsx)("h2",{className:"text-xl font-bold mb-4",children:"设置TRON多签权限"}),l&&(0,s.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm",children:l}),d&&(0,s.jsx)("div",{className:"bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-4 text-sm",children:d}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"被控制地址"}),(0,s.jsx)("input",{type:"text",value:c,onChange:e=>x(e.target.value),placeholder:"输入需要设置多签的地址",className:"w-full px-3 py-2 border border-gray-300 rounded text-sm"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"控制地址列表"}),m.map((e,t)=>(0,s.jsxs)("div",{className:"flex gap-2 mb-2",children:[(0,s.jsx)("input",{type:"text",value:e,onChange:e=>p(t,e.target.value),placeholder:"控制地址 ".concat(t+1),className:"flex-1 px-3 py-2 border border-gray-300 rounded text-sm"}),m.length>1&&(0,s.jsx)("button",{onClick:()=>g(t),className:"px-2 py-1 bg-red-500 text-white rounded text-sm",children:"删除"})]},t)),m.length<5&&(0,s.jsx)("button",{onClick:()=>{m.length<5&&h([...m,""])},className:"mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm",children:"添加地址"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"所需签名数"}),(0,s.jsx)("input",{type:"number",value:u,onChange:e=>b(Math.min(parseInt(e.target.value)||1,m.length)),min:1,max:m.length,className:"w-full px-3 py-2 border border-gray-300 rounded text-sm"})]}),(0,s.jsx)("button",{onClick:w,disabled:r,className:"w-full px-4 py-2 text-white rounded text-sm ".concat(r?"bg-gray-400":"bg-green-500 active:bg-green-600"),children:r?"设置中...":"设置多签权限"})]})]})})})};function l(){return(0,s.jsx)("main",{className:"container mx-auto p-4",children:(0,s.jsx)(n,{})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(5489)),_N_E=e.O()}]);