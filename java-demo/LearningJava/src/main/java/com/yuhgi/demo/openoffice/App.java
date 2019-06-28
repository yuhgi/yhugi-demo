package com.yuhgi.demo.openoffice;

import com.yuhgi.converter.OfficeConverter;
import com.yuhgi.utils.HuaWeiOssUtil;
import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeManager;

import java.io.*;

public class App {
    public static void main(String[] args) throws Exception{
        String appName = "test";
        String bussinessCode = "course";
        String toPath = "/home/yuhgi/Documents/convert/from";
        File fromDir = new File("/home/yuhgi/Documents/convert/from");
        String url = HuaWeiOssUtil.getPreviewUrl("seats/2019/06/course/1561689071.png");
        System.out.println(url);
        File[] allFiles = fromDir.listFiles();
        String libreOfficeHome = "/usr/lib/libreoffice/";
        String openOfficeHome = "/opt/openoffice4/";

        OfficeManager officeManager = LocalOfficeManager.builder()
                .officeHome(libreOfficeHome)
                .portNumbers(2002,2003,2004,2005)
                .build();
        officeManager.start();
        for(File f:allFiles){
            try {
                if(!f.isDirectory()){
                    String fileName = f.getName();
                    if(fileName.startsWith(".")){
                        continue;
                    }

                    InputStream inputStream = new FileInputStream(f);
                    String shortName = fileName.substring(0,fileName.lastIndexOf("."));
                    String fileExtension = fileName.substring(fileName.lastIndexOf("."));
                    String pdfName = shortName + "/"+shortName+".pdf";
                    String objectKey = HuaWeiOssUtil.createObjectKey(appName,bussinessCode,pdfName);
                    OfficeConverter converter = new OfficeConverter(officeManager);

                    ByteArrayOutputStream outputStream =(ByteArrayOutputStream) converter.docToPdf(inputStream);
                    byte[] dataBytes = outputStream.toByteArray();
                    InputStream pdfInputStream = new ByteArrayInputStream(dataBytes);//转换后的输入流
                    outputStream.flush(); //加在转换前不行，就放在转换后
                    HuaWeiOssUtil.uploadByInputStream(objectKey,pdfInputStream);
                    System.out.println(fileName+"----转换成功");
                    switch (fileExtension){
                        case ".pdf":{

                            break;
                        }
                        case ".doc":
                        case ".docx":{
                            //HuaWeiOssUtil.uploadByInputStream(objectKey,inputStream);
                            break;
                        }
                        case ".ppt":
                        case ".pptx":{
                            //HuaWeiOssUtil.uploadByInputStream(objectKey,inputStream);
                            break;
                        }
                    }
                    System.out.println(objectKey+"----存储oss成功");


                }
            }catch(Exception e){
                System.out.println("----转换失败");
                e.printStackTrace();
            }

        }

        //停止服务
        officeManager.stop( );
    }
}
