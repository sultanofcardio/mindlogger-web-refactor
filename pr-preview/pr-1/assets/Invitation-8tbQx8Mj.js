import{j as t}from"./index-BMwGXOHN.js";import{u as d,B as s,T as r,e as c}from"./LaunchDarklyProvider-3c5FlTCa.js";import{P as l}from"./index-BhhNTH8T.js";const i=()=>d({keyPrefix:"invitation"}),x=({appletName:n,isUserAuthenticated:a})=>{const{t:e}=i();return t.jsxs(s,{"data-testid":"invitation-content",children:[t.jsx(s,{className:"invitationBody",dangerouslySetInnerHTML:{__html:e("inviteContent.description",{displayName:n})??""}}),t.jsx(s,{margin:"24px 0px",children:t.jsxs("ol",{children:[t.jsx("li",{children:e("inviteContent.step1")}),t.jsxs("li",{children:[e("inviteContent.step2"),a?"":e("inviteContent.step2_1")]}),t.jsx("li",{children:t.jsx(s,{dangerouslySetInnerHTML:{__html:e("inviteContent.step3",{displayName:n})??""}})})]})})]})},h=({appletName:n,role:a})=>{const{t:e}=i();return t.jsxs(s,{"data-testid":"invitation-header",children:[t.jsxs(r,{variant:"h4",margin:"12px 0px",children:[e("inviteContent.welcome"),t.jsx("strong",{children:` ${n}`})]}),t.jsx(r,{variant:"body1",children:`${e("inviteContent.title",{role:a})} ${n}. ${e("inviteContent.toAccept")}`})]})},m="https://cmi-logos.s3.amazonaws.com/ChildMindInstitute_Logo_Horizontal_RGB.png",p=({size:n={height:50,width:120},className:a=""})=>t.jsx("img",{height:n==null?void 0:n.height,width:n==null?void 0:n.width,className:`mr-1 p-1 ${a}`,src:m,loading:"lazy"}),C=({invite:n,actionComponent:a,isUserAuthenticated:e})=>{const{t:o}=i();return(n==null?void 0:n.status)==="approved"?t.jsx(l,{message:o("invitationAlreadyAccepted")}):(n==null?void 0:n.status)==="declined"?t.jsx(l,{message:o("invitationAlreadyDeclined")}):t.jsx(s,{color:c.colors.light.onPrimaryContainer,textAlign:"left","data-testid":"invitation-block",children:n&&t.jsxs(t.Fragment,{children:[t.jsx(h,{appletName:n.appletName,role:n.role}),a,t.jsx(x,{appletName:n.appletName,isUserAuthenticated:e}),t.jsxs(s,{margin:"12px 0px","data-testid":"invitation-footer",children:[t.jsx(s,{children:t.jsx(p,{size:{width:200,height:80}})}),t.jsx("small",{children:o("inviteContent.footer")})]})]})})};export{C as I,i as u};
