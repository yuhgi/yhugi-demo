package com.yuhgi.hadoopbook.chapter3;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;

public class FileCopyWithProgress {
    public static void main(String[] args)throws Exception{
        String source = "D://tmp/long.txt";
        String dest = "hdfs://master:9000/user/yuhgi/long.txt";
        InputStream in = new BufferedInputStream(new FileInputStream(source));
        Configuration conf = new Configuration();

        FileSystem fs = FileSystem.get(URI.create(dest),conf,"yuhgi");

        OutputStream out = fs.create(new Path(dest), new Progressable() {
            int cnt = 0;
            @Override
            public void progress() {
                System.out.print(". ");
            }
        });
        IOUtils.copyBytes(in,out,4096,true);
    }
}
