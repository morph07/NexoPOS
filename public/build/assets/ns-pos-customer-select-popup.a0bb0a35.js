import{g as z,_,p as L,y as g,s as y,j as f,o as l,a as i,f as e,t as o,k as d,e as u,F as x,r as C,l as V,m,q as w,i as A,w as H,v as F,bz as W,P}from"./bootstrap.91ec4684.js";import{n as D}from"./currency.5ffb8e5e.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";import{b as q}from"./ns-notice.3688f715.js";import N from"./ns-pos-confirm-popup.81cb5794.js";import{n as B}from"./ns-paginate.cd51fdea.js";import{n as E}from"./ns-orders-preview-popup.15bffbfa.js";const Q={mounted(){this.closeWithOverlayClicked(),this.loadTransactionFields()},data(){return{fields:[],isSubmiting:!1,formValidation:new z}},methods:{__:_,closeWithOverlayClicked:L,proceed(){const t=this.$popupParams.customer,r=this.formValidation.extractFields(this.fields);this.isSubmiting=!0,g.post(`/api/nexopos/v4/customers/${t.id}/account-history`,r).subscribe({next:p=>{this.isSubmiting=!1,y.success(p.message).subscribe(),this.$popupParams.resolve(p),this.$popup.close()},error:p=>{this.isSubmiting=!1,y.error(p.message).subscribe(),this.$popupParams.reject(p)}})},close(){this.$popup.close(),this.$popupParams.reject(!1)},loadTransactionFields(){g.get("/api/nexopos/v4/fields/ns.customers-account").subscribe({next:t=>{this.fields=this.formValidation.createFields(t)}})}}},K={class:"w-6/7-screen md:w-5/7-screen lg:w-4/7-screen h-6/7-screen md:h-5/7-screen lg:h-5/7-screen overflow-hidden shadow-lg ns-box flex flex-col relative"},M={class:"p-2 border-b ns-box-header flex justify-between items-center"},Y={class:"font-semibold"},G={class:"flex-auto overflow-y-auto"},J={key:0,class:"h-full w-full flex items-center justify-center"},X={key:1,class:"p-2"},Z={class:"p-2 ns-box-footer justify-between border-t flex"},$=e("div",null,null,-1),ee={class:"px-1"},se={class:"-mx-2 flex flex-wrap"},te={class:"px-1"},oe={class:"px-1"},re={key:0,class:"h-full w-full absolute flex items-center justify-center",style:{background:"rgb(0 98 171 / 45%)"}};function ne(t,r,p,v,n,s){const k=f("ns-close-button"),h=f("ns-spinner"),b=f("ns-field"),T=f("ns-button");return l(),i("div",K,[e("div",M,[e("h2",Y,o(s.__("New Transaction")),1),e("div",null,[d(k,{onClick:r[0]||(r[0]=a=>s.close())})])]),e("div",G,[n.fields.length===0?(l(),i("div",J,[d(h)])):u("",!0),n.fields.length>0?(l(),i("div",X,[(l(!0),i(x,null,C(n.fields,(a,S)=>(l(),V(b,{field:a,key:S},null,8,["field"]))),128))])):u("",!0)]),e("div",Z,[$,e("div",ee,[e("div",se,[e("div",te,[d(T,{type:"error",onClick:r[1]||(r[1]=a=>s.close())},{default:m(()=>[w(o(s.__("Close")),1)]),_:1})]),e("div",oe,[d(T,{type:"info",onClick:r[2]||(r[2]=a=>s.proceed())},{default:m(()=>[w(o(s.__("Proceed")),1)]),_:1})])])])]),n.isSubmiting===0?(l(),i("div",re,[d(h)])):u("",!0)])}var le=O(Q,[["render",ne]]);const ie={name:"ns-pos-coupons-load-popup",components:{nsNotice:q},data(){return{placeHolder:_("Coupon Code"),couponCode:null,order:null,activeTab:"apply-coupon",orderSubscriber:null,customerCoupon:null}},mounted(){this.popupCloser(),this.$refs.coupon.select(),this.orderSubscriber=POS.order.subscribe(t=>{this.order=t,this.order.coupons.length>0&&(this.activeTab="active-coupons")}),this.$popupParams&&this.$popupParams.apply_coupon&&(this.couponCode=this.$popupParams.apply_coupon,this.getCoupon(this.couponCode).subscribe({next:t=>{this.customerCoupon=t,this.apply()}}))},destroyed(){this.orderSubscriber.unsubscribe()},methods:{__:_,popupCloser:L,popupResolver:A,selectCustomer(){Popup.show(I)},cancel(){this.customerCoupon=null,this.couponCode=null},removeCoupon(t){this.order.coupons.splice(t,1),POS.refreshCart()},apply(){try{const t=this.customerCoupon;if(this.customerCoupon.coupon.valid_hours_start!==null&&!ns.date.moment.isAfter(this.customerCoupon.coupon.valid_hours_start)&&this.customerCoupon.coupon.valid_hours_start.length>0)return y.error(_("The coupon is out from validity date range.")).subscribe();if(this.customerCoupon.coupon.valid_hours_end!==null&&!ns.date.moment.isBefore(this.customerCoupon.coupon.valid_hours_end)&&this.customerCoupon.coupon.valid_hours_end.length>0)return y.error(_("The coupon is out from validity date range.")).subscribe();const r=this.customerCoupon.coupon.products;if(r.length>0){const n=r.map(s=>s.product_id);if(this.order.products.filter(s=>n.includes(s.product_id)).length===0)return y.error(_("This coupon requires products that aren't available on the cart at the moment.")).subscribe()}const p=this.customerCoupon.coupon.categories;if(p.length>0){const n=p.map(s=>s.category_id);if(this.order.products.filter(s=>n.includes(s.$original().category_id)).length===0)return y.error(_("This coupon requires products that belongs to specific categories that aren't included at the moment.").replace("%s")).subscribe()}this.cancel();const v={active:t.coupon.active,customer_coupon_id:t.id,minimum_cart_value:t.coupon.minimum_cart_value,maximum_cart_value:t.coupon.maximum_cart_value,name:t.coupon.name,type:t.coupon.type,value:0,limit_usage:t.coupon.limit_usage,code:t.coupon.code,discount_value:t.coupon.discount_value,categories:t.coupon.categories,products:t.coupon.products};POS.pushCoupon(v),this.activeTab="active-coupons",setTimeout(()=>{this.popupResolver(v)},500),y.success(_("The coupon has applied to the cart.")).subscribe()}catch(t){console.log(t)}},getCouponType(t){switch(t){case"percentage_discount":return _("Percentage");case"flat_discount":return _("Flat");default:return _("Unknown Type")}},getDiscountValue(t){switch(t.type){case"percentage_discount":return t.discount_value+"%";case"flat_discount":return this.$options.filters.currency(t.discount_value)}},closePopup(){this.popupResolver(!1)},setActiveTab(t){this.activeTab=t},getCoupon(t){return!this.order.customer_id>0?y.error(_("You must select a customer before applying a coupon.")).subscribe():g.post(`/api/nexopos/v4/customers/coupons/${t}`,{customer_id:this.order.customer_id})},loadCoupon(){const t=this.couponCode;this.getCoupon(t).subscribe({next:r=>{this.customerCoupon=r,y.success(_("The coupon has been loaded.")).subscribe()},error:r=>{y.error(r.message||_("An unexpected error occured.")).subscribe()}})}}},ce={class:"shadow-lg ns-box w-95vw md:w-3/6-screen lg:w-2/6-screen"},ue={class:"border-b ns-box-header p-2 flex justify-between items-center"},de={class:"font-bold"},ae={class:"p-1 ns-box-body"},_e={class:"border-2 input-group info rounded flex"},pe=["placeholder"],he={class:"pt-2"},me={key:0,class:"pt-2 flex"},fe={key:1,class:"pt-2"},be={class:"overflow-hidden"},ye={key:0,class:"pt-2 fade-in-entrance anim-duration-500 overflow-y-auto ns-scrollbar h-64"},xe={class:"w-full ns-table"},ve={class:"p-2 w-1/2 border"},we={class:"p-2 w-1/2 border"},ge={class:"p-2 w-1/2 border"},Ce={class:"p-2 w-1/2 border"},ke={class:"p-2 w-1/2 border"},Te={class:"p-2 w-1/2 border"},Pe={class:"p-2 w-1/2 border"},Se={class:"p-2 w-1/2 border"},Le={class:"p-2 w-1/2 border"},Oe={class:"p-2 w-1/2 border"},je={class:"p-2 w-1/2 border"},Ae={class:"p-2 w-1/2 border"},Ne={key:0},Re={class:"p-2 w-1/2 border"},Ve={class:"p-2 w-1/2 border"},He={key:0},Fe={key:0},We={class:"flex-auto"},De={class:"font-semibold text-primary p-2 flex justify-between"},Ie={key:0,class:"flex justify-between elevation-surface border items-center p-2"},Ue={key:0,class:"flex"};function ze(t,r,p,v,n,s){const k=f("ns-close-button"),h=f("ns-notice"),b=f("ns-tabs-item"),T=f("ns-tabs");return l(),i("div",ce,[e("div",ue,[e("h3",de,o(s.__("Load Coupon")),1),e("div",null,[d(k,{onClick:r[0]||(r[0]=a=>s.closePopup())})])]),e("div",ae,[d(T,{onChangeTab:r[5]||(r[5]=a=>s.setActiveTab(a)),active:n.activeTab},{default:m(()=>[d(b,{label:s.__("Apply A Coupon"),padding:"p-2",identifier:"apply-coupon"},{default:m(()=>[e("div",_e,[H(e("input",{ref:"coupon",onKeyup:r[1]||(r[1]=W(a=>s.loadCoupon(),["enter"])),"onUpdate:modelValue":r[2]||(r[2]=a=>n.couponCode=a),type:"text",class:"w-full text-primary p-2 outline-none",placeholder:n.placeHolder},null,40,pe),[[F,n.couponCode]]),e("button",{onClick:r[3]||(r[3]=a=>s.loadCoupon()),class:"px-3 py-2"},o(s.__("Load")),1)]),e("div",he,[d(h,{color:"info"},{description:m(()=>[w(o(s.__("Input the coupon code that should apply to the POS. If a coupon is issued for a customer, that customer must be selected priorly.")),1)]),_:1})]),n.order&&n.order.customer_id===void 0?(l(),i("div",me,[e("button",{onClick:r[4]||(r[4]=a=>s.selectCustomer()),class:"w-full border p-2 outline-none ns-numpad-key info cursor-pointer text-center"},o(s.__("Click here to choose a customer.")),1)])):u("",!0),n.order&&n.order.customer_id!==void 0?(l(),i("div",fe,[d(h,{color:"success"},{description:m(()=>[w(o(s.__("Loading Coupon For : ")+`${n.order.customer.name} ${n.order.customer.surname}`),1)]),_:1})])):u("",!0),e("div",be,[n.customerCoupon?(l(),i("div",ye,[e("table",xe,[e("tbody",null,[e("tr",null,[e("td",ve,o(s.__("Coupon Name")),1),e("td",we,o(n.customerCoupon.name),1)]),e("tr",null,[e("td",ge,o(s.__("Discount"))+" ("+o(s.getCouponType(n.customerCoupon.coupon.type))+")",1),e("td",Ce,o(s.getDiscountValue(n.customerCoupon.coupon)),1)]),e("tr",null,[e("td",ke,o(s.__("Usage")),1),e("td",Te,o(n.customerCoupon.usage+"/"+(n.customerCoupon.limit_usage||s.__("Unlimited"))),1)]),e("tr",null,[e("td",Pe,o(s.__("Valid From")),1),e("td",Se,o(n.customerCoupon.coupon.valid_hours_start||s.__("N/A")),1)]),e("tr",null,[e("td",Le,o(s.__("Valid Till")),1),e("td",Oe,o(n.customerCoupon.coupon.valid_hours_end||s.__("N/A")),1)]),e("tr",null,[e("td",je,o(s.__("Categories")),1),e("td",Ae,[e("ul",null,[(l(!0),i(x,null,C(n.customerCoupon.coupon.categories,a=>(l(),i("li",{class:"rounded-full px-3 py-1 border",key:a.id},o(a.category.name),1))),128)),n.customerCoupon.coupon.categories.length===0?(l(),i("li",Ne,o(s.__("Not applicable")),1)):u("",!0)])])]),e("tr",null,[e("td",Re,o(s.__("Products")),1),e("td",Ve,[e("ul",null,[(l(!0),i(x,null,C(n.customerCoupon.coupon.products,a=>(l(),i("li",{class:"rounded-full px-3 py-1 border",key:a.id},o(a.product.name),1))),128)),n.customerCoupon.coupon.products.length===0?(l(),i("li",He,o(s.__("Not applicable")),1)):u("",!0)])])])])])])):u("",!0)])]),_:1},8,["label"]),d(b,{label:s.__("Active Coupons"),padding:"p-1",identifier:"active-coupons"},{default:m(()=>[n.order?(l(),i("ul",Fe,[(l(!0),i(x,null,C(n.order.coupons,(a,S)=>(l(),i("li",{key:S,class:"flex justify-between elevation-surface border items-center px-2 py-1"},[e("div",We,[e("h3",De,[e("span",null,o(a.name),1),e("span",null,o(s.getDiscountValue(a)),1)])]),e("div",null,[d(k,{onClick:j=>s.removeCoupon(S)},null,8,["onClick"])])]))),128)),n.order.coupons.length===0?(l(),i("li",Ie,o(s.__("No coupons applies to the cart.")),1)):u("",!0)])):u("",!0)]),_:1},8,["label"])]),_:1},8,["active"])]),n.customerCoupon?(l(),i("div",Ue,[e("button",{onClick:r[6]||(r[6]=a=>s.apply()),class:"w-1/2 px-3 py-2 bg-success-tertiary text-white font-bold"},o(s.__("Apply")),1),e("button",{onClick:r[7]||(r[7]=a=>s.cancel()),class:"w-1/2 px-3 py-2 bg-error-tertiary text-white font-bold"},o(s.__("Cancel")),1)])):u("",!0)])}var qe=O(ie,[["render",ze]]);const Be={name:"ns-pos-customers",data(){return{activeTab:"create-customers",customer:null,subscription:null,orders:[],options:{},optionsSubscriber:null,selectedTab:"orders",isLoadingCoupons:!1,isLoadingRewards:!1,isLoadingHistory:!1,isLoadingOrders:!1,coupons:[],rewardsResponse:[],order:null,walletHistories:[]}},components:{nsPaginate:B},destroyed(){this.subscription.unsubscribe(),this.optionsSubscriber.unsubscribe()},mounted(){this.closeWithOverlayClicked(),this.optionsSubscriber=POS.options.subscribe(t=>{this.options=t}),this.subscription=POS.order.subscribe(t=>{this.order=t,this.$popupParams.customer!==void 0?(this.activeTab="account-payment",this.customer=this.$popupParams.customer,this.loadCustomerOrders()):t.customer!==void 0&&(this.activeTab="account-payment",this.customer=t.customer,this.loadCustomerOrders())}),this.popupCloser()},methods:{__:_,nsCurrency:D,reload(){this.loadCustomerOrders()},popupResolver:A,popupCloser:L,getWalletHistoryLabel(t){switch(t){case"add":return _("Crediting");case"deduct":return _("Removing");case"refund":return _("Refunding");case"payment":return _("Payment");default:return _("Unknow")}},getType(t){switch(t){case"percentage_discount":return _("Percentage Discount");case"flat_discount":return _("Flat Discount")}},closeWithOverlayClicked:L,async openOrderOptions(t){try{const r=await new Promise((p,v)=>{P.show(E,{order:t,resolve:p,reject:v})});this.reload()}catch{y.error(_("An error occured while opening the order options")).subscribe()}},doChangeTab(t){this.selectedTab=t,t==="coupons"&&this.loadCoupons(),t==="rewards"&&this.loadRewards(),t==="wallet-history"&&this.loadAccounHistory(),t==="orders"&&this.loadCustomerOrders()},loadAccounHistory(){this.isLoadingHistory=!0,g.get(`/api/nexopos/v4/customers/${this.customer.id}/account-history`).subscribe({next:t=>{this.walletHistories=t.data,this.isLoadingHistory=!1},error:t=>{this.isLoadingHistory=!1}})},loadCoupons(){this.isLoadingCoupons=!0,g.get(`/api/nexopos/v4/customers/${this.customer.id}/coupons`).subscribe({next:t=>{this.coupons=t,this.isLoadingCoupons=!1},error:t=>{this.isLoadingCoupons=!1}})},loadRewards(t=`/api/nexopos/v4/customers/${this.customer.id}/rewards`){this.isLoadingRewards=!0,g.get(t).subscribe({next:r=>{this.rewardsResponse=r,this.isLoadingRewards=!1},error:r=>{this.isLoadingRewards=!1}})},prefillForm(t){this.$popupParams.name!==void 0&&(t.main.value=this.$popupParams.name)},openCustomerSelection(){this.$popup.close(),P.show(I)},loadCustomerOrders(){this.isLoadingOrders=!0,g.get(`/api/nexopos/v4/customers/${this.customer.id}/orders`).subscribe({next:t=>{this.orders=t,this.isLoadingOrders=!1},error:t=>{this.isLoadingOrders=!1}})},newTransaction(t){new Promise((p,v)=>{P.show(le,{customer:t,resolve:p,reject:v})}).then(p=>{POS.loadCustomer(t.id).subscribe(v=>{POS.selectCustomer(v)})})},applyCoupon(t){this.order.customer===void 0?P.show(N,{title:_("Use Customer ?"),message:_("No customer is selected. Would you like to proceed with this customer ?"),onAction:r=>{r&&POS.selectCustomer(this.customer).then(p=>{this.proceedApplyingCoupon(t)})}}):this.order.customer.id===this.customer.id?this.proceedApplyingCoupon(t):this.order.customer.id!==this.customer.id&&P.show(N,{title:_("Change Customer ?"),message:_("Would you like to assign this customer to the ongoing order ?"),onAction:r=>{r&&POS.selectCustomer(this.customer).then(p=>{this.proceedApplyingCoupon(t)})}})},proceedApplyingCoupon(t){new Promise((r,p)=>{P.show(qe,{apply_coupon:t.code,resolve:r,reject:p})}).then(r=>{this.popupResolver(!1)}).catch(r=>{})},handleSavedCustomer(t){y.success(t.message).subscribe(),POS.selectCustomer(t.entry),this.$popup.close()}}},Ee={id:"ns-pos-customers",class:"shadow-lg rounded w-95vw h-95vh lg:w-3/5-screen flex flex-col overflow-hidden"},Qe={class:"ns-header p-2 flex justify-between items-center border-b"},Ke={class:"font-semibold"},Me={class:"ns-body flex-auto flex p-2 overflow-y-auto"},Ye={key:1,class:"h-full flex-col w-full flex items-center justify-center text-primary"},Ge=e("i",{class:"lar la-hand-paper ns-icon text-6xl"},null,-1),Je={class:"font-medium text-2xl"},Xe={key:0,class:"flex-auto w-full flex items-center justify-center flex-col p-4"},Ze=e("i",{class:"lar la-frown text-6xl"},null,-1),$e={class:"font-medium text-2xl"},es={class:"my-2"},ss={key:1,class:"flex flex-col flex-auto"},ts={class:"flex-auto p-2 flex flex-col"},os={class:"-mx-4 flex flex-wrap ns-tab-cards"},rs={class:"px-4 mb-4 w-full"},ls={class:"font-semibold"},is={class:"px-4 mb-4 w-full md:w-1/4"},cs={class:"rounded-lg shadow bg-transparent bg-gradient-to-br from-success-secondary to-green-700 p-2 flex flex-col text-white"},us={class:"font-medium text-lg"},ds={class:"w-full flex justify-end"},as={class:"font-bold"},_s={class:"px-4 mb-4 w-full md:w-1/4"},ps={class:"rounded-lg shadow bg-transparent bg-gradient-to-br from-error-secondary to-red-700 p-2 text-white"},hs={class:"font-medium text-lg"},ms={class:"w-full flex justify-end"},fs={class:"text-2xl font-bold"},bs={class:"px-4 mb-4 w-full md:w-1/4"},ys={class:"rounded-lg shadow bg-transparent bg-gradient-to-br from-blue-500 to-blue-700 p-2 text-white"},xs={class:"font-medium text-lg"},vs={class:"w-full flex justify-end"},ws={class:"text-2xl font-bold"},gs={class:"px-4 mb-4 w-full md:w-1/4"},Cs={class:"rounded-lg shadow bg-transparent bg-gradient-to-br from-teal-500 to-teal-700 p-2 text-white"},ks={class:"font-medium text-lg"},Ts={class:"w-full flex justify-end"},Ps={class:"text-2xl font-bold"},Ss={class:"flex flex-auto flex-col overflow-hidden"},Ls={key:0,class:"flex-auto h-full justify-center flex items-center"},Os={class:"py-2 w-full"},js={class:"font-semibold text-primary"},As={class:"flex-auto flex-col flex overflow-hidden"},Ns={class:"flex-auto overflow-y-auto"},Rs={class:"table ns-table w-full"},Vs={class:"text-primary"},Hs={colspan:"3",width:"150",class:"p-2 border font-semibold"},Fs={width:"50",class:"p-2 border font-semibold"},Ws={class:"text-primary"},Ds={key:0},Is={class:"border p-2 text-center",colspan:"4"},Us={colspan:"3",class:"border p-2 text-center"},zs={class:"flex flex-col items-start"},qs={class:"font-bold"},Bs={class:"md:-mx-2 w-full flex flex-col md:flex-row"},Es={class:"md:px-2 flex items-start w-full md:w-1/4"},Qs={class:"md:px-2 flex items-start w-full md:w-1/4"},Ks={class:"md:px-2 flex items-start w-full md:w-1/4"},Ms={class:"border p-2 text-center"},Ys=["onClick"],Gs=e("i",{class:"las la-wallet"},null,-1),Js={class:"ml-1"},Xs={key:0,class:"flex-auto h-full justify-center flex items-center"},Zs={class:"py-2 w-full"},$s={class:"font-semibold text-primary"},et={class:"flex-auto flex-col flex overflow-hidden"},st={class:"flex-auto overflow-y-auto"},tt={class:"table ns-table w-full"},ot={class:"text-primary"},rt={colspan:"3",width:"150",class:"p-2 border font-semibold"},nt={class:"text-primary"},lt={key:0},it={class:"border p-2 text-center",colspan:"3"},ct={colspan:"3",class:"border p-2 text-center"},ut={class:"flex flex-col items-start"},dt={class:"font-bold"},at={class:"md:-mx-2 w-full flex flex-col md:flex-row"},_t={class:"md:px-2 flex items-start w-full md:w-1/3"},pt={class:"md:px-2 flex items-start w-full md:w-1/3"},ht={key:0,class:"flex-auto h-full justify-center flex items-center"},mt={class:"py-2 w-full"},ft={class:"font-semibold text-primary"},bt={class:"flex-auto flex-col flex overflow-hidden"},yt={class:"flex-auto overflow-y-auto"},xt={class:"table ns-table w-full"},vt={class:"text-primary"},wt={width:"150",class:"p-2 border font-semibold"},gt={class:"p-2 border font-semibold"},Ct=e("th",{class:"p-2 border font-semibold"},null,-1),kt={class:"text-primary text-sm"},Tt={key:0},Pt={class:"border p-2 text-center",colspan:"4"},St={width:"300",class:"border p-2"},Lt={class:""},Ot={class:"-mx-2 flex"},jt={class:"text-xs text-primary px-2"},At={class:"text-xs text-primary px-2"},Nt={class:"border p-2 text-center"},Rt={key:0},Vt={key:1},Ht={class:"border p-2 text-right"},Ft={key:0,class:"flex-auto h-full justify-center flex items-center"},Wt={class:"py-2 w-full"},Dt={class:"font-semibold text-primary"},It={class:"flex-auto flex-col flex overflow-hidden"},Ut={class:"flex-auto overflow-y-auto"},zt={class:"table ns-table w-full"},qt={class:"text-primary"},Bt={width:"150",class:"p-2 border font-semibold"},Et={class:"p-2 border font-semibold"},Qt={class:"p-2 border font-semibold"},Kt={key:0,class:"text-primary text-sm"},Mt={key:0},Yt={class:"border p-2 text-center",colspan:"4"},Gt={width:"300",class:"border p-2"},Jt={class:"text-center"},Xt={width:"300",class:"border p-2"},Zt={class:"text-center"},$t={width:"300",class:"border p-2"},eo={class:"text-center"},so={class:"py-1 flex justify-end"},to={class:"p-2 border-t border-box-edge flex justify-between"},oo=e("div",null,null,-1);function ro(t,r,p,v,n,s){const k=f("ns-close-button"),h=f("ns-crud-form"),b=f("ns-tabs-item"),T=f("ns-button"),a=f("ns-spinner"),S=f("ns-paginate"),j=f("ns-tabs");return l(),i("div",Ee,[e("div",Qe,[e("h3",Ke,o(s.__("Customers")),1),e("div",null,[d(k,{onClick:r[0]||(r[0]=c=>t.$popup.close())})])]),e("div",Me,[d(j,{active:n.activeTab,onActive:r[7]||(r[7]=c=>n.activeTab=c)},{default:m(()=>[d(b,{identifier:"create-customers",label:"New Customer"},{default:m(()=>[n.options.ns_pos_customers_creation_enabled==="yes"?(l(),V(h,{key:0,onUpdated:r[1]||(r[1]=c=>s.prefillForm(c)),onSave:r[2]||(r[2]=c=>s.handleSavedCustomer(c)),"submit-url":"/api/nexopos/v4/crud/ns.customers",src:"/api/nexopos/v4/crud/ns.customers/form-config"},{title:m(()=>[w(o(s.__("Customer Name")),1)]),save:m(()=>[w(o(s.__("Save Customer")),1)]),_:1})):u("",!0),n.options.ns_pos_customers_creation_enabled!=="yes"?(l(),i("div",Ye,[Ge,e("h3",Je,o(s.__("Not Authorized")),1),e("p",null,o(s.__("Creating customers has been explicitly disabled from the settings.")),1)])):u("",!0)]),_:1}),d(b,{identifier:"account-payment",label:s.__("Customer Account"),class:"flex",style:{padding:"0!important"}},{default:m(()=>[n.customer===null?(l(),i("div",Xe,[Ze,e("h3",$e,o(s.__("No Customer Selected")),1),e("p",null,o(s.__("In order to see a customer account, you need to select one customer.")),1),e("div",es,[d(T,{onClick:r[3]||(r[3]=c=>s.openCustomerSelection()),type:"info"},{default:m(()=>[w(o(s.__("Select Customer")),1)]),_:1})])])):u("",!0),n.customer?(l(),i("div",ss,[e("div",ts,[e("div",os,[e("div",rs,[e("h2",ls,o(s.__("Summary For"))+" : "+o(n.customer.name),1)]),e("div",is,[e("div",cs,[e("h3",us,o(s.__("Total Purchases")),1),e("div",ds,[e("h2",as,o(s.nsCurrency(t.amount)),1)])])]),e("div",_s,[e("div",ps,[e("h3",hs,o(s.__("Total Owed")),1),e("div",ms,[e("h2",fs,o(s.nsCurrency(t.amount)),1)])])]),e("div",bs,[e("div",ys,[e("h3",xs,o(s.__("Wallet Amount")),1),e("div",vs,[e("h2",ws,o(s.nsCurrency(t.amount)),1)])])]),e("div",gs,[e("div",Cs,[e("h3",ks,o(s.__("Credit Limit")),1),e("div",Ts,[e("h2",Ps,o(s.nsCurrency(t.amount)),1)])])])]),e("div",Ss,[d(j,{active:n.selectedTab,onChangeTab:r[5]||(r[5]=c=>s.doChangeTab(c))},{default:m(()=>[d(b,{identifier:"orders",label:s.__("Orders")},{default:m(()=>[n.isLoadingOrders?(l(),i("div",Ls,[d(a,{size:"36"})])):u("",!0),n.isLoadingOrders?u("",!0):(l(),i(x,{key:1},[e("div",Os,[e("h2",js,o(s.__("Last Purchases")),1)]),e("div",As,[e("div",Ns,[e("table",Rs,[e("thead",null,[e("tr",Vs,[e("th",Hs,o(s.__("Order")),1),e("th",Fs,o(s.__("Options")),1)])]),e("tbody",Ws,[n.orders.length===0?(l(),i("tr",Ds,[e("td",Is,o(s.__("No orders...")),1)])):u("",!0),(l(!0),i(x,null,C(n.orders,c=>(l(),i("tr",{key:c.id},[e("td",Us,[e("div",zs,[e("h3",qs,o(s.__("Code"))+": "+o(c.code),1),e("div",Bs,[e("div",Es,[e("small",null,o(s.__("Total"))+": "+o(s.nsCurrency(t.total)),1)]),e("div",Qs,[e("small",null,o(s.__("Status"))+": "+o(c.human_status),1)]),e("div",Ks,[e("small",null,o(s.__("Delivery"))+": "+o(c.human_delivery_status),1)])])])]),e("td",Ms,[e("button",{onClick:U=>s.openOrderOptions(c),class:"rounded-full h-8 px-2 flex items-center justify-center border border-gray ns-inset-button success"},[Gs,e("span",Js,o(s.__("Options")),1)],8,Ys)])]))),128))])])])])],64))]),_:1},8,["label"]),d(b,{identifier:"wallet-history",label:s.__("Wallet History")},{default:m(()=>[n.isLoadingHistory?(l(),i("div",Xs,[d(a,{size:"36"})])):u("",!0),n.isLoadingHistory?u("",!0):(l(),i(x,{key:1},[e("div",Zs,[e("h2",$s,o(s.__("Wallet History")),1)]),e("div",et,[e("div",st,[e("table",tt,[e("thead",null,[e("tr",ot,[e("th",rt,o(s.__("Transaction")),1)])]),e("tbody",nt,[n.walletHistories.length===0?(l(),i("tr",lt,[e("td",it,o(s.__("No History...")),1)])):u("",!0),(l(!0),i(x,null,C(n.walletHistories,c=>(l(),i("tr",{key:c.id},[e("td",ct,[e("div",ut,[e("h3",dt,o(s.__("Transaction"))+": "+o(s.getWalletHistoryLabel(c.operation)),1),e("div",at,[e("div",_t,[e("small",null,o(s.__("Amount"))+": "+o(s.nsCurrency(t.amount)),1)]),e("div",pt,[e("small",null,o(s.__("Date"))+": "+o(c.created_at),1)])])])])]))),128))])])])])],64))]),_:1},8,["label"]),d(b,{identifier:"coupons",label:s.__("Coupons")},{default:m(()=>[n.isLoadingCoupons?(l(),i("div",ht,[d(a,{size:"36"})])):u("",!0),n.isLoadingCoupons?u("",!0):(l(),i(x,{key:1},[e("div",mt,[e("h2",ft,o(s.__("Coupons")),1)]),e("div",bt,[e("div",yt,[e("table",xt,[e("thead",null,[e("tr",vt,[e("th",wt,o(s.__("Name")),1),e("th",gt,o(s.__("Type")),1),Ct])]),e("tbody",kt,[n.coupons.length===0?(l(),i("tr",Tt,[e("td",Pt,o(s.__("No coupons for the selected customer...")),1)])):u("",!0),(l(!0),i(x,null,C(n.coupons,c=>(l(),i("tr",{key:c.id},[e("td",St,[e("h3",null,o(c.name),1),e("div",Lt,[e("ul",Ot,[e("li",jt,o(s.__("Usage :"))+" "+o(c.usage)+"/"+o(c.limit_usage),1),e("li",At,o(s.__("Code :"))+" "+o(c.code),1)])])]),e("td",Nt,[w(o(s.getType(c.coupon.type))+" ",1),c.coupon.type==="percentage_discount"?(l(),i("span",Rt," ("+o(c.coupon.discount_value)+"%) ",1)):u("",!0),c.coupon.type==="flat_discount"?(l(),i("span",Vt," ("+o(s.nsCurrency(t.value))+") ",1)):u("",!0)]),e("td",Ht,[d(T,{onClick:U=>s.applyCoupon(c),type:"info"},{default:m(()=>[w(o(s.__("Use Coupon")),1)]),_:2},1032,["onClick"])])]))),128))])])])])],64))]),_:1},8,["label"]),d(b,{identifier:"rewards",label:s.__("Rewards")},{default:m(()=>[n.isLoadingRewards?(l(),i("div",Ft,[d(a,{size:"36"})])):u("",!0),n.isLoadingRewards?u("",!0):(l(),i(x,{key:1},[e("div",Wt,[e("h2",Dt,o(s.__("Rewards")),1)]),e("div",It,[e("div",Ut,[e("table",zt,[e("thead",null,[e("tr",qt,[e("th",Bt,o(s.__("Name")),1),e("th",Et,o(s.__("Points")),1),e("th",Qt,o(s.__("Target")),1)])]),n.rewardsResponse.data?(l(),i("tbody",Kt,[n.rewardsResponse.data.length===0?(l(),i("tr",Mt,[e("td",Yt,o(s.__("No rewards available the selected customer...")),1)])):u("",!0),(l(!0),i(x,null,C(n.rewardsResponse.data,c=>(l(),i("tr",{key:c.id},[e("td",Gt,[e("h3",Jt,o(c.reward_name),1)]),e("td",Xt,[e("h3",Zt,o(c.points),1)]),e("td",$t,[e("h3",eo,o(c.target),1)])]))),128))])):u("",!0)])])]),e("div",so,[d(S,{pagination:n.rewardsResponse,onLoad:r[4]||(r[4]=c=>s.loadRewards(c))},null,8,["pagination"])])],64))]),_:1},8,["label"])]),_:1},8,["active"])])]),e("div",to,[oo,e("div",null,[d(T,{onClick:r[6]||(r[6]=c=>s.newTransaction(n.customer)),type:"info"},{default:m(()=>[w(o(s.__("Account Transaction")),1)]),_:1})])])])):u("",!0)]),_:1},8,["label"])]),_:1},8,["active"])])])}var R=O(Be,[["render",ro]]);const no={data(){return{searchCustomerValue:"",orderSubscription:null,order:{},debounceSearch:null,customers:[],isLoading:!1}},computed:{customerSelected(){return!1}},watch:{searchCustomerValue(t){clearTimeout(this.debounceSearch),this.debounceSearch=setTimeout(()=>{this.searchCustomer(t)},500)}},mounted(){this.$popup.event.subscribe(t=>{t.event==="click-overlay"&&this.resolveIfQueued(!1)}),this.orderSubscription=POS.order.subscribe(t=>{this.order=t}),this.getRecentCustomers(),this.$refs.searchField.focus()},destroyed(){this.orderSubscription.unsubscribe()},methods:{__:_,nsCurrency:D,resolveIfQueued:A,attemptToChoose(){if(this.customers.length===1)return this.selectCustomer(this.customers[0]);y.info("Too many result.").subscribe()},openCustomerHistory(t,r){r.stopImmediatePropagation(),this.$popup.close(),P.show(R,{customer:t,activeTab:"account-payment"})},selectCustomer(t){this.customers.forEach(r=>r.selected=!1),t.selected=!0,this.isLoading=!0,POS.selectCustomer(t).then(r=>{this.isLoading=!1,this.resolveIfQueued(t)}).catch(r=>{this.isLoading=!1})},searchCustomer(t){g.post("/api/nexopos/v4/customers/search",{search:t}).subscribe(r=>{r.forEach(p=>p.selected=!1),this.customers=r})},createCustomerWithMatch(t){this.resolveIfQueued(!1),P.show(R,{name:t})},getRecentCustomers(){this.isLoading=!0,g.get("/api/nexopos/v4/customers/recently-active").subscribe({next:t=>{this.isLoading=!1,t.forEach(r=>r.selected=!1),this.customers=t},error:t=>{this.isLoading=!1}})}}},lo={id:"ns-pos-customer-select-popup",class:"ns-box shadow-xl w-4/5-screen md:w-2/5-screen xl:w-108"},io={id:"header",class:"border-b ns-box-header text-center font-semibold text-2xl py-2"},co={class:"relative"},uo={class:"p-2 border-b ns-box-body items-center flex justify-between"},ao={class:"flex items-center justify-between"},_o=e("i",{class:"las la-eye"},null,-1),po=[_o],ho={class:"p-2 border-b ns-box-body flex justify-between text-primary"},mo={class:"input-group flex-auto border-2 rounded"},fo={class:"h-3/5-screen xl:h-2/5-screen overflow-y-auto ns-scrollbar"},bo={class:"ns-vertical-menu"},yo={key:0,class:"p-2 text-center text-primary"},xo={class:"border-b border-dashed border-info-primary"},vo=["onClick"],wo={class:"flex items-center"},go={key:0,class:"text-error-primary"},Co={key:1},ko={class:"purchase-amount"},To=["onClick"],Po=e("i",{class:"las la-eye"},null,-1),So=[Po],Lo={key:0,class:"z-10 top-0 absolute w-full h-full flex items-center justify-center"};function Oo(t,r,p,v,n,s){const k=f("ns-spinner");return l(),i("div",lo,[e("div",io,[e("h2",null,o(s.__("Select Customer")),1)]),e("div",co,[e("div",uo,[e("span",null,o(s.__("Selected"))+" : ",1),e("div",ao,[e("span",null,o(n.order.customer?n.order.customer.name:"N/A"),1),n.order.customer?(l(),i("button",{key:0,onClick:r[0]||(r[0]=h=>s.openCustomerHistory(n.order.customer,h)),class:"mx-2 rounded-full h-8 w-8 flex items-center justify-center border ns-inset-button hover:border-transparent"},po)):u("",!0)])]),e("div",ho,[e("div",mo,[H(e("input",{ref:"searchField",onKeydown:r[1]||(r[1]=W(h=>s.attemptToChoose(),["enter"])),"onUpdate:modelValue":r[2]||(r[2]=h=>n.searchCustomerValue=h),placeholder:"Search Customer",type:"text",class:"outline-none w-full p-2"},null,544),[[F,n.searchCustomerValue]])])]),e("div",fo,[e("ul",bo,[n.customers&&n.customers.length===0?(l(),i("li",yo,o(s.__("No customer match your query...")),1)):u("",!0),n.customers&&n.customers.length===0?(l(),i("li",{key:1,onClick:r[3]||(r[3]=h=>s.createCustomerWithMatch(n.searchCustomerValue)),class:"p-2 cursor-pointer text-center text-primary"},[e("span",xo,o(s.__("Create a customer")),1)])):u("",!0),(l(!0),i(x,null,C(n.customers,h=>(l(),i("li",{onClick:b=>s.selectCustomer(h),key:h.id,class:"cursor-pointer p-2 border-b text-primary flex justify-between items-center"},[e("span",null,o(h.name),1),e("p",wo,[h.owe_amount>0?(l(),i("span",go,"-"+o(s.nsCurrency(h.owe_amount)),1)):u("",!0),h.owe_amount>0?(l(),i("span",Co,"/")):u("",!0),e("span",ko,o(s.nsCurrency(h.purchases_amount)),1),e("button",{onClick:b=>s.openCustomerHistory(h,b),class:"mx-2 rounded-full h-8 w-8 flex items-center justify-center border ns-inset-button info"},So,8,To)])],8,vo))),128))])]),n.isLoading?(l(),i("div",Lo,[d(k,{size:"24",border:"8"})])):u("",!0)])])}var I=O(no,[["render",Oo]]);export{qe as a,R as b,I as n};
