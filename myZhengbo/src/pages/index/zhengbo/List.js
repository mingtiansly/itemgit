import Taro, { Component } from '@tarojs/taro'
import { View, Input , Text} from '@tarojs/components'
import './List.css'
import back from './img/fanhu_03.png'
import black from './img/zbback.jpg'
import wenzi from './img/fanhu_06.png'
import zb from './img/fanhu_08.png'
class List  extends Component{
    config: Config = {
      navigationBarTitleText: '列表'
    }
     constructor(props) {
               super(props);
               this.state={artilcle:[],page:'',lastpage:'',link:''},
               this.inf=this.inf.bind(this)
               this.next=this.next.bind(this)
               this.goback=this.goback.bind(this)
                this.detsil=this.detsil.bind(this)
                this.prev = this.prev.bind(this)
               }
               
    goback(){
window.history.go(-1);
             }  
 inf(page){
   const me=this  
    
     
    
 
    if(process.env.NODE_ENV === 'development'){
   Taro.request({
  
      url:'/ddapi/api/article?pages&page='+page,
   
  
   mode:'cors',
   data: {
     
   },
   
   header: {
     'content-type': 'application/json'
   }
 })
 .then(res =>this.setState({
     artilcle:res.data.data,page:res.data.current_page,lastpage:res.data.last_page,
     link:res.data.data.remote_url,
 })
 )
 }  else{
   Taro.request({
        url:'http://wx.wangshouxin.cn/api/article?page='+page,
     mode:'cors',
     data: {
     },
     
     header: {
       'content-type': 'application/json'
     }
   })
   .then(res =>this.setState({
       artilcle:res.data.data,page:res.data.current_page,lastpage:res.data.last_page,
       link:res.data.data.remote_url,
   })
   )
 }
  
            }
detsil(idd){
   
    const linkk = idd.currentTarget.dataset.lin
    
    if(linkk !=""){
    
    Taro.navigateTo({
      url: '/pages/index/zhengbo/Link?link='+linkk
    })
    
    }else{
        
      const dds=idd.currentTarget.dataset.id
      
      		Taro.navigateTo({
      		  url: '/pages/index/zhengbo/Details?id='+dds
      		})
       
    }
}
prev(ww){
   const cc = ww.currentTarget.dataset.a
   
   if (cc>0) {
   	this.inf(cc)
   }
}
next(pa){
  
     const ss = pa.currentTarget.dataset.mm
     
     if(ss<=this.state.lastpage){
         this.inf(ss)
         
     }
     
}
  componentDidMount() {
   this.inf(1)
  }
            render() {
             const page = this.state.page
             const lastpage = this.state.lastpage
             const list = this.state.artilcle.map((num)=>{
                 return(
               !!num.remote_url?<View className='li'><a style="color: darkslategrey;display: block;" href={num.remote_url}>{num.title}</a></View>:<View className='li' data-id={num.id} data-lin={num.remote_url} onClick={this.detsil} >{num.title}</View >
               
               )});
             return (
             <View className="top1">
                
                 <View><img src={black} mode="widthFix" className='black' /></View>
                 <View className="top">
                     <View><img onClick={this.goback} src={back} mode="widthFix" className='back' /></View>
                     <View><img src={wenzi} mode="widthFix" className='wenzi' /></View>
                     <View><img src={zb} mode="widthFix" className='zb' /></View>
                 </View>
                
                 <View className="clear"></View>
                 
                 <View className='ul'>
                 {list}
                 </View>
                 
                 
                 <View className='page'>
                 <Text>{page}/</Text><Text>{lastpage}</Text><Text className="previous" data-a={page-1} onClick={this.prev}>上一页</Text><Text  className="next" data-mm={page-0+1} onClick={this.next}>下一页</Text>
                 </View>
             </View>
             );
             }
               
               
    }
    export default List ;