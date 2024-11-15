import{j as e,L as T}from"./index-BMwGXOHN.js";import{a as g,u as B,z as l,D as i,a3 as I,B as r,d as N,c as b,T as M}from"./LaunchDarklyProvider-3c5FlTCa.js";import{u as D,c as A,f as F,e as u,R as H,C as z,B as E,I as w,g as x,D as Q}from"./index-DoRMT53w.js";import{s as f}from"./isContainsSpaces-CSoBuoo8.js";const Y=s=>D(["approveRecoveryPassword"],g.approveRecoveryPassword,{...s}),_=(s,a)=>A(["recoveryPasswordLinkHealthcheck",{...s}],()=>g.recoveryLinkHealthCheck(s),a),h=()=>{const{t:s,i18n:a}=B({keyPrefix:"ChangePassword"});return{t:s,i18n:a}},O=l.object({new:l.string().trim().min(6,{message:i.validation.password.minLength}).refine(s=>!f(s),{message:i.validation.password.shouldNotContainSpaces}),confirm:l.string().trim().min(6,{message:i.validation.password.minLength}).refine(s=>!f(s),{message:i.validation.password.shouldNotContainSpaces})}).refine(s=>s.new===s.confirm,{message:i.validation.password.notMatch,path:["confirm"]}),U=({title:s,token:a,email:n})=>{const o=I(),{t}=h(),c=F({defaultValues:{new:"",confirm:""}},O),{handleSubmit:y,reset:v}=c,{mutate:j,isLoading:P,error:d,status:C}=Y({onSuccess(){v()}}),k=L=>{if(a&&n)return j({key:a,email:n,password:L.new})},[m,S]=u(),[p,R]=u();return C==="success"?(o(H.login.path,{state:{isPasswordReset:!0}}),e.jsx(e.Fragment,{})):e.jsx(z,{className:"change-password-form-container",children:e.jsxs(E,{...c,onSubmit:y(k),children:[e.jsx(r,{className:"overflow-hidden",marginBottom:2,children:e.jsx("p",{children:s})}),e.jsxs(r,{display:"flex",flex:1,gap:2,flexDirection:"column",children:[e.jsx(w,{id:"recovery-password-new-password",type:m,name:"new",placeholder:t("newPassword")||"",autoComplete:"new-password",Icon:e.jsx(x,{isSecure:m==="password",onClick:S})}),e.jsx(w,{id:"recovery-password-confirm-new-password",type:p,name:"confirm",placeholder:t("confirmPassword")||"",autoComplete:"new-password",Icon:e.jsx(x,{isSecure:p==="password",onClick:R})})]}),e.jsx(Q,{errorMessage:d==null?void 0:d.evaluatedMessage}),e.jsx(r,{marginY:3,children:e.jsx(N,{type:"submit",variant:"contained",isLoading:P,text:t("submit")})})]})})};function J(){const[s]=b(),{t:a}=h(),n=s.get("key"),o=s.get("email"),{isError:t,isLoading:c}=_({email:o??"",key:n??""});return c?e.jsx(T,{}):t?e.jsx(r,{display:"flex",flex:1,justifyContent:"center",alignItems:"center",textAlign:"center",children:e.jsx(M,{variant:"body1",fontSize:"24px",margin:"16px 0px",children:e.jsx(r,{dangerouslySetInnerHTML:{__html:a("invalidLink")??""}})})}):e.jsx(r,{display:"flex",flex:1,justifyContent:"center",textAlign:"center",padding:3,margin:3,children:e.jsxs(r,{textAlign:"center",marginY:2,paddingX:3,flex:1,children:[e.jsx(r,{children:e.jsx("h3",{className:"text-primary",children:a("title")})}),e.jsx(U,{title:a("formTitle",{email:o}),token:n,email:o})]})})}export{J as default};
