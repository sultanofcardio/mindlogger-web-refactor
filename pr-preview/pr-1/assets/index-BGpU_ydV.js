import{j as e,L as p}from"./index-BMwGXOHN.js";import{u as d,B as o,T as a,M as f,f as j,c as y,m as g}from"./LaunchDarklyProvider-3c5FlTCa.js";import{i as x,P as l,A as w}from"./index-BhhNTH8T.js";import{c as u,M as h,b as P,aR as T}from"./index-DoRMT53w.js";import"./signup.schema-DH0eMdIG.js";const O=(n,t)=>u(["acceptTransferOwnership",n],()=>x.acceptTransferOwnership(n),t);var S={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const k=({appletId:n,keyParam:t})=>{const{t:r}=d({keyPrefix:"transferOwnership"}),i=S.VITE_ADMIN_PANEL_HOST??"",{isLoading:s,isError:c}=O({appletId:n,key:t},{onSuccess(){f.track({action:h.TransferOwnershipAccepted,[P.AppletId]:n})}});return s?e.jsx(p,{}):c?e.jsx(l,{message:r("notFound")}):e.jsxs(o,{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center","data-testid":"transfer-ownership-accepted",children:[e.jsx(a,{variant:"body1",fontSize:"30px",margin:"16px 0px",testid:"transfer-ownership-accepted-title",children:r("accepted.title")}),e.jsxs(o,{"data-testid":"transfer-ownership-accepted-content",children:[e.jsx(a,{variant:"body2",fontSize:"18px",children:r("accepted.message1")}),e.jsxs(a,{variant:"body2",fontSize:"18px",sx:{"& a:hover":{textDecoration:"underline"}},children:[r("accepted.message2")," ",e.jsx("a",{href:i,target:"_blank",rel:"noreferrer",children:r("adminPanel")})]})]})]})},v=(n,t)=>u(["declineTransferOwnership",n],()=>x.declineTransferOwnerShip(n),t),A=({appletId:n,keyParam:t})=>{const{t:r}=d({keyPrefix:"transferOwnership"}),{isLoading:i,isError:s}=v({appletId:n,key:t},{onSuccess(){f.track({action:h.TransferOwnershipDeclined})}});return i?e.jsx(p,{}):s?e.jsx(l,{message:r("notFound")}):e.jsxs(o,{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center","data-testid":"transfer-ownership-declined",children:[e.jsx(a,{variant:"body1",fontSize:"30px",margin:"16px 0px",testid:"transfer-ownership-declined-title",children:r("declined.title")}),e.jsxs(o,{"data-testid":"transfer-ownership-declined-content",children:[e.jsx(a,{variant:"body2",fontSize:"18px",children:r("declined.message1")}),e.jsx(a,{variant:"body2",fontSize:"18px",children:r("declined.message2")})]})]})};function L(){const{appletId:n}=j(),[t]=y(),r=g(),{t:i}=d(),s=t.get("key"),c=t.get("action");if(!n||!s||!c)return e.jsx(l,{message:i("wrondLinkParametrError")});const m={backRedirectPath:`${r.pathname}${r.search}`};return e.jsx(o,{display:"flex",flex:1,justifyContent:"center",margin:"24px 0px",children:e.jsxs(T,{fallback:e.jsx(w,{redirectState:m}),children:[c==="accept"&&e.jsx(k,{appletId:n,keyParam:s}),c==="decline"&&e.jsx(A,{appletId:n,keyParam:s})]})})}export{L as default};
