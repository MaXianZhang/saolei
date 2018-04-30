import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import ajax from "ajax"

class MainList extends React.Component {
	render () {
		let ukey = 6271;
		let dataList = this.props.data;
		let arr = [];

		for(var id in dataList) {
			arr.push(<Puppy data={dataList[id]} key={ukey+id}/>);
		}
		
		return (
			<div className="P-wrapper">
				{arr}
			</div>)
	}
}

class Puppy extends React.Component {
	handleClick(data) {
		ReactDOM.render(
			<Showpuppy data={data}/>
			,document.getElementById('content'));
	}
	render () {
		var data = this.props.data;
		var id = data.id;

		return (
		<div className="puppy" data-id={data.id}>
			<div className="wrapper">
				<div onClick={(e) => this.handleClick(data, e)} className="img_box">
					<div href={data.url}>
						<img alt="" className="load-img fade" src={data.imageUrl}></img>
					</div>
				</div>
				<div className="intro">
					<h3 onClick={(e) => this.handleClick(data, e)}>
						{data.title}
					</h3>
					<div onClick={(e) => this.handleClick(data, e)} className="abstract">
						{data.content}
					</div>
				</div>
			</div>
			<div className="time-div">
				<span className="time" title="2018-03-24 17:16">{data.date}</span>
			</div>

			<B_delete D_id={data.id}/>
			<B_change data={data}/>

		</div>
		)
	}
}
//  基础操作：查
class Showpuppy extends React.Component {
	BackToHome() {
		handleData("GET",{},su);
	}
	render() {
		const data = this.props.data;
		const id = data.id;

		return (
			<div className="" data-id={data.id}>
				<button onClick={this.BackToHome}>返回首页</button>
				<B_change id={data.id}/>

				<div className="wrapper">
					<h3 >
						{data.title}
					</h3>

					<div className="">
						<div href={data.url}>
							<img alt="Dashlane发布2018加密货币交易所密码安全排名 币安未进前十" className="load-img fade" src={data.imageUrl}></img>
						</div>
					</div>

					<div className="">
						{data.content}
					</div>

				</div>

				<div className="">
					<span className="time" title="2018-03-24 17:16">{data.date}</span>
				</div>

				<B_delete D_id={data.id}/>
			</div>
			)
	}
}
//基础操作：删
class B_delete extends React.Component {
	handleClick(id) {
		console.log(id);

		handleData("DELETE",{
			id :id
		},su);
	}
	render() {
		const id =this.props.D_id;

		return (
			<button onClick={(e) => this.handleClick(id, e)}>删除此文章</button>
			)
	} 
}
//基础操作：改
class B_change extends React.Component{
	changeToIuputPage(data) {
		ReactDOM.render(
			<Iuputpage data={data}/>
			,document.getElementById('content'))
	}

	render() {
		const data = this.props.data;
		return (
			<button onClick={(e) => this.changeToIuputPage(data, e)}>修改此文章</button>
			)
	}
}
//基础操作：增
class B_put extends React.Component {
	changeToIuputPage() {
		ReactDOM.render(
			<Iuputpage/>
			,document.getElementById('content'))
	}
	render() {
		return (
			<button onClick={this.changeToIuputPage}>添加新文章</button>
			)
	}
}
//增操作和改操作的输入页面
class Iuputpage extends React.Component {
	constructor(props) {
		super(props);
		if(this.props.data){
			var data = this.props.data;
			this.state = {
				id: data.id,
				imageUrl: data.imageUrl,
				title: data.title,
				content: data.content,
				date: data.date
			}
		} else {
			this.state = {
				id: "",
				imageUrl: "",
				title: "",
				content: "",
				date: ""
			}
		}

		this.titleChange = this.titleChange.bind(this);
		this.imageChange = this.imageChange.bind(this);
	    this.contentChange = this.contentChange.bind(this);
	    this.idChange = this.idChange.bind(this);
	    this.saveData = this.saveData.bind(this);
	}

	cancelIuput() {
		handleData("GET",{},su);
	}

	saveData() {
		if(!this.state.date) {
			var myDate = new Date();
			var mytime = myDate.toLocaleString();;

			this.state.date = mytime;
		}

		handleData("POST",{
			id: this.state.id,
			content: this.state},su);
	}

	titleChange(event) {
		this.setState({title: event.target.value});
	}
	idChange(event){
		this.setState({id: event.target.value});
	}

	imageChange(event) {
		this.setState({imageUrl: event.target.value});
	}

	contentChange(event) {
		this.setState({content: event.target.value});
	}

	render() {
		return (
			<div className="input-wrapper">
				<div className="in-id">
					<div className="tit">ID</div>
					<input value={this.state.id} onChange={this.idChange} placeholder="请输入一个数字ID"></input>
				</div>
				<div className="in-title">
					<div className="tit">标题</div>
					<input value={this.state.title} onChange={this.titleChange} placeholder="请输入标题"></input>
				</div>
				<div className="in-imageUrl">
					<div className="tit">图片链接</div>
					<textarea value={this.state.imageUrl} onChange={this.imageChange} placeholder="请输入图片链接"></textarea>	
				</div>
				<div className="in-content">
					<div className="tit">正文</div>
					<textarea value={this.state.content} onChange={this.contentChange} placeholder="请输入正文"/>
				</div>
				<div className="b-wrapper">
					<button onClick={this.saveData} className="keep">保存文章</button>
					<button onClick={this.cancelIuput} className="cancel">取消</button>
				</div>
			</div>
			)
	}  
}

function handleData(type,data,su) {
	const url = 'http://127.0.0.1:8360/home/index/setdata';
	data.type = type;
	if (data.content) {
		data.content = JSON.stringify(data.content);
	}

	ajax.post(url,data,su);
}

handleData("GET",{},su);

function su (data) {
	data = JSON.parse(data.data);
	ReactDOM.render(
	<main>
		<MainList data={data}/>
		<B_put />
	</main>
	,document.getElementById('content'));
}