package com.yuhgi.hadoopbook.chapter3;

import org.apache.hadoop.fs.FsUrlStreamHandlerFactory;
import org.apache.hadoop.io.IOUtils;

import java.io.InputStream;
import java.net.URL;

public class URLCat {
    static {
        // 一个java虚拟机只能调用一次此方法
        URL.setURLStreamHandlerFactory(new FsUrlStreamHandlerFactory());
    }

    public static void main(String[] args) throws Exception{
        InputStream in = null;
        try{
            String url = "hdfs://master:9000/user/yuhgi/hello.txt";
            in = new URL(url).openStream();
            IOUtils.copyBytes(in,System.out,4096,false);
        }finally {
            IOUtils.closeStream(in);
        }
    }
}
