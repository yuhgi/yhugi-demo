package com.yuhgi.hadoopbook.chapter3;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import java.io.InputStream;
import java.net.URI;
import java.net.URL;

public class FileSystemCat {
    public static void main(String[] args) throws Exception{
        String url = "hdfs://master:9000/user/yuhgi/hello.txt";
        FSDataInputStream in = null;
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.get(URI.create(url),conf);
        try{

            in = fs.open(new Path(url));
            IOUtils.copyBytes(in,System.out,4096,false);
            in.seek(0);
            IOUtils.copyBytes(in,System.out,4096,false);
        }finally {
            IOUtils.closeStream(in);
        }
    }
}
