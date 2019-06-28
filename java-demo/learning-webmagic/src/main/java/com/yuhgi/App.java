package com.yuhgi;

import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.monitor.SpiderMonitor;
import us.codecraft.webmagic.pipeline.JsonFilePipeline;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) throws Exception {
        Spider githubSpider = Spider.create(new GithubRepoPageProcessor())
                //从"https://github.com/code4craft"开始抓
                .addUrl("http://www.w3school.com.cn")
                .addPipeline(new JsonFilePipeline("D:\\webmagic\\"));
                //开启5个线程抓取
                //.thread(5)
                //启动爬虫
        SpiderMonitor.instance().register(githubSpider);
        githubSpider.start();

    }
}
