import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text,Image,WebView } from '@tarojs/components';
import './List.css'

class Link extends Component{
    config: Config = {
      navigationBarTitleText: '活动简介'
    }
    
    constructor(props) {
           super(props);
           }
           
          componentWillMount () {
           console.log(this.$router.params)
           this.$router.params
         }
           
        render() {
         return (
         <View>
        <WebView src={this.$router.params.link} />
         
         </View>
         );
         }
           
           
}
export default Link ;