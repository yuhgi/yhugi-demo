package com.yuhgi.hadoopbook.chapter3;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import java.net.URI;

public class FileDir {
    public static void main(String[] args) throws Exception{
        String url = "hdfs://master:9000/user/yuhgi/books";
        FSDataInputStream in = null;
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.get(URI.create(url),conf,"yuhgi");
        Path path = new Path(url);
        if(fs.exists(path)){
            fs.delete(path,true);
        }
        fs.mkdirs(path);
    }
}
