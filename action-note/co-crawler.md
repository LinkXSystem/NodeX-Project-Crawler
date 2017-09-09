```js
const Crawler=require("crawler");
const co=require("co");
const cheerio=require("cheerio");
const json2csv=require("json2csv");
const fs=require("fs");


let c=new Crawler({
    retries:1,
    retryTimeout:3000
});

let contentJson=[];
let id=0;
let errorCount=0;

const getHtml=co.wrap(function*(html){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            c.queue({
                url:html,
                forceUTF8:true,
                callback:function (error,result,$) {
                    if(error||!result.body){
                        errorCount++;
                        return resolve({result:false});
                    }
                    result=result.body;
                    resolve({error,result,$})
                }
            })
        },2000)
    })

});




const getContent=co.wrap(function*(body){
    let $=cheerio.load(body);
    let title=$(".sherry_title>h1").text();
    let content=$(".content").text();

    return Promise.resolve({title,content})
});


const getSubHtml=co.wrap(function*(body){
    let $=cheerio.load(body);
    let UrlElems=$("a.sherry_title");
    let subUrlList=[];
    UrlElems.each((i,e)=>{
        let url=$(e).attr('href');
        let href=`${url}`;
        subUrlList.push(href);
    });

    for(let item of subUrlList){
        let {result}=yield getHtml(item);
        if(!result){
            continue;
        }
        let {title,content}=yield getContent(result);
        console.log(`${title}获取完毕`);
        id++;
        contentJson.push({
            id,
            title,
            content
        })

    }

});

let urlList=[];

for(let i=1;i<=250;i++){
    urlList.push(`http://www.admin5.com/browse/19/list_${i}.shtml`)
}
co(function*(){
    for (let url of urlList){
        let {result}=yield getHtml(url);
        if(!result){
            continue;
        }
        //console.log("result",result);
        //获取当页所有SUB
        yield getSubHtml(result);

    }
    console.info(`全部爬取完毕,一共爬取${id}错误次数为${errorCount}`);
    let r1 = json2csv({ data: contentJson, fields: ['id','title','content'] });

    fs.writeFile("./admin5.com.csv",r1,()=>{

    });
});



process.on('unhandledRejection', function (err) {
    console.error(err.stack);
});

process.on(`uncaughtException`, console.error);
```