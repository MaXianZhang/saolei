'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  
  setdataAction() {
    let type = this.post('type');
    let id = this.post('id') || undefined;
    let content = this.post("content") ? JSON.parse(this.post("content")) : undefined;
    let su = this.post('su');
    
    // console.log("setdataAction is running",type,id,content)

    const res = this.model("database").handle(type,id,content);

    this.success(JSON.stringify(res));
    console.log('数据请求成功')
  }
}

