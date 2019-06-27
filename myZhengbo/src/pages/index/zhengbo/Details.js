import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './List.css'
import back from './img/fanhu_03.png'
import black from './img/zbback.jpg'
import wenzi from './img/fanhu_06.png'
import zb from './img/fanhu_08.png'

  
class Details extends Component {
constructor(props){
            super(props);
           this.state={thumb:'',title:'',time:'',cont:'',article:''},
            this.goback=this.goback.bind(this)
    }
     goback(){
    window.history.go(-1);
                 }  
   
 fg(){
   if(process.env.NODE_ENV === 'development'){
   Taro.request({
       method: 'POST',
  url: '/ddapi/api/article/querycontent ',
  data: {
    id:this.$router.params.id
  },
  header: {
    'content-type': 'application/json'
  }
})
  .then(res =>this.setState({
      title:res.data.title,time:res.data.time,cont:res.data.click,article:res.data.content,
      thumb:res.data.thumb?('http://wx.wangshouxin.cn/uploads/'+res.data.thumb.replace(/\\/g,"\/")):''
    })
  )}else{
    Taro.request({
           method: 'POST',
      url: 'http://wx.wangshouxin.cn/api/article/querycontent  ',
      data: {
        id:this.$router.params.id
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res =>this.setState({
          title:res.data.title,time:res.data.time,cont:res.data.click,article:res.data.content,
          thumb:res.data.thumb?('http://wx.wangshouxin.cn/uploads/'+res.data.thumb.replace(/\\/g,"\/")):''
        })
      )
  }
 }
 
 componentDidMount() {
   this.fg()
  }
   componentWillMount () {
     //console.log(this.$router.params)
   }
   
  render() {
   
    return (
    <View className="details">
    <View className="detail">
    <View><img src={black} mode="widthFix" className='black' /></View>
    <View className="top2">
        <View><img onClick={this.goback} src={back} mode="widthFix" className='back' /></View>
        <View><img src={wenzi} mode="widthFix" className='wenzi' /></View>
        <View><img src={zb} mode="widthFix" className='zb' /></View>
    </View>
      <View>
      <View className="clear"></View>
      <Text className="deta">{this.state.title}</Text>
      <Text className="despan">{this.state.time}</Text><Text className="despan1">阅读：{this.state.cont}</Text>
      </View>
      <View className="article">
        {!!this.state.thumb && <View><img src={this.state.thumb} mode="widthFix" /></View>}
        {this.state.article}
      </View>
    </View>
    </View>
    );
    
  }
}

export default Details;
