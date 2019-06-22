package com.yuhgi;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.pipeline.JsonFilePipeline;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.Page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GithubRepoPageProcessor implements PageProcessor {
    private Site site = Site.me().setRetryTimes(3).setSleepTime(1000);
    @Override
    // process是定制爬虫逻辑的核心接口，在这里编写抽取逻辑
    public void process(Page page) {
        // 部分二：定义如何抽取页面信息，并保存下来
        List<String> urlList = page.getHtml().xpath("//div[@id='navsecond']//li/a/text()").all();
        List<String> nameList = page.getHtml().xpath("//div[@id='navsecond']//li/a/@title").all();

        Map<String,String> map = new HashMap<>();
        for(int i =0,len=urlList.size();i<len;i++){
            map.put(urlList.get(i),nameList.get(i));
        }
        page.putField("所有教程",map);
//        if (page.getResultItems().get("name") == null) {
//            //skip this page
//            page.setSkip(true);
//        }
//        page.putField("readme", page.getHtml().xpath("//div[@id='readme']/tidyText()"));

        // 部分三：从页面发现后续的url地址来抓取
        // page.addTargetRequests(page.getHtml().links().regex("(https://github\\.com/[\\w\\-]+/[\\w\\-]+)").all());
    }

    @Override
    public Site getSite() {
        return site;
    }

}
