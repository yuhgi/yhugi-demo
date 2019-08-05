package com.yuhgi.demo.openoffice;

import com.yuhgi.converter.OfficeConverter;
import com.yuhgi.converter.PdfConverter;
import com.yuhgi.utils.HuaWeiOssUtil;
import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeManager;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;

public class App {
    public static void main(String[] args) throws Exception{
        String appName = "test";
        String bussinessCode = "course";
        String toPath = "/home/yuhgi/Documents/convert/to";
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
                    System.out.println(fileName+"----开始pdf转换");
                    long startTime=System.currentTimeMillis();
                    ByteArrayOutputStream outputStream = converter.officeToPdf(inputStream,fileExtension);
                    long endTime = System.currentTimeMillis();
                    System.out.println(fileName+"----pdf转换成功."+"耗时----"+(endTime-startTime)+"ms");
                    byte[] dataBytes = outputStream.toByteArray();
                    InputStream pdfInputStream = new ByteArrayInputStream(dataBytes);//转换后的输入流
                    outputStream.flush(); //加在转换前不行，就放在转换后
                    PdfConverter pdfConverter = new PdfConverter();
                    ArrayList<BufferedImage> images = pdfConverter.pdfToJpg(dataBytes);

                    System.out.println(fileName+"----开始图片转换");
                    startTime=System.currentTimeMillis();
                    for(int i=0,len=images.size();i<len;i++){
                        BufferedImage image = images.get(i);
                        String path = toPath+"/"+shortName+"/"+i+".jpg";
                        File file = new File(path);
                        if(!file.exists()){
                            file.mkdirs();
                        }

                        ImageIO.write(image,"jpg",file);
                    }
                    System.out.println(fileName+"----图片转换成功."+"耗时----"+(endTime-startTime)+"ms");
//                    System.out.println(objectKey+"----开始上传oss");
//                    startTime=System.currentTimeMillis();
//                    HuaWeiOssUtil.uploadByInputStream(objectKey,pdfInputStream);
//                    endTime = System.currentTimeMillis();
//                    outputStream.close();
//                    inputStream.close();
//                    pdfInputStream.close();
//                    System.out.println(objectKey+"----上传oss成功."+"耗时----"+(endTime-startTime)+"ms");
                }
            }catch(Exception e){
                System.out.println("----转换失败");
                e.printStackTrace();
            }

        }

        //停止服务
        officeManager.stop( );
    }

    public static void convertPdfToImage(){

    }
}
