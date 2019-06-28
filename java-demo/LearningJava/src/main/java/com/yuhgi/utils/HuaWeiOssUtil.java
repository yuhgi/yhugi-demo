package com.yuhgi.utils;

import com.obs.services.ObsClient;
import com.obs.services.ObsConfiguration;
import com.obs.services.exception.ObsException;
import com.obs.services.model.ObjectListing;
import com.obs.services.model.ObsObject;
import com.obs.services.model.TemporarySignatureResponse;


import java.io.InputStream;
import java.io.File;
import java.util.*;

public class HuaWeiOssUtil {
    private static String ak = "J2PTFP4PSKDDKKIXSOBB";
    private static String sk = "AZ7bJbT4ZufisD1U7R8WFy6C2nH3IlhrYPnjeufO";
    private static String endPoint = "obs.cn-north-1.myhuaweicloud.com";
    private static String bucketName = "obs-safety";

    /**
     * @description 生成拼接后的对象键
     * @param appName 应用名称
     * @param bussinessCode 业务代码
     * @return 拼接后的key
     */
    public static String createObjectKey(String appName,String bussinessCode,String fileName){
        Date d = new Date();
        String year = Integer.toString(d.getYear() + 1900);
        String month = String.format("%02d",d.getMonth()+1);
        return appName + '/' + year + '/' + month + '/' + bussinessCode + '/' +  fileName;
    }

    /**
     * @description 获取对象前缀
     * @param key 对象键值
     * @return 拼接后的key
     */
    public static String getObjectPrefix(String key){
        int index = key.lastIndexOf('/');
        return key.substring(0,index);
    }


    /**
     * @return ObsClient oss客户端
     * @description 获取OssClient
     */
    private static ObsClient getOssClient() {
        ObsConfiguration configuration = new ObsConfiguration();
        configuration.setEndPoint(endPoint);

        return new ObsClient(ak, sk, configuration);
    }

    /**
     *
     * @title uploadByInputStream
     * @description 通过输入流上传文件
     * @param inputStream 	输入流
     * @param objectName 	上传文件目录和（包括文件名） 例如“test/a.jpg”
     * @return void 		返回类型
     * @throws
     */
    public static void uploadByInputStream( String objectName,InputStream inputStream) throws Exception {
        ObsClient ossClient = getOssClient();
        try {
            ossClient.putObject(bucketName, objectName, inputStream);
        } catch (ObsException e) {
            throw e;
        } finally {
            ossClient.close();
        }
    }

    /**
     * @title uploadByFile
     * @description 通过file上传文件
     * @param file       上传的文件
     * @param objectName 上传文件目录和（包括文件名） 例如“test/a.jpg”
     * @return void        返回类型
     * @throws
     *
     */
    public static void uploadByFile( String objectName,File file) throws Exception {
        ObsClient ossClient = getOssClient();
        try {
            ossClient.putObject(bucketName, objectName, file);
        } catch (Exception e) {
            throw e;
        } finally {
            ossClient.close();
        }
    }


    /**
     * @title: deleteFile
     * @description: 根据key删除oss服务器上的文件
     * @param key        文件路径/名称，例如“test/a.txt”
     * @return void            返回类型
     * @throws
     */
    public static void deleteFile(String key)throws Exception {
        ObsClient ossClient = getOssClient();
        try{
            ossClient.deleteObject(bucketName, key);
        }catch (Exception e) {
            throw e;
        } finally {
            ossClient.close();
        }
    }

    /**
     * @title getInputStreamByOSS
     * @description 根据key获取服务器上的文件的输入流
     * @param key        文件路径和名称
     * @return InputStream    文件输入流
     * @throws
     */
    public static InputStream getInputStream(String key)throws Exception {
        ObsClient ossClient = getOssClient();
        InputStream content = null;
        try {
            ObsObject ossObj = ossClient.getObject(bucketName, key);
            content = ossObj.getObjectContent();
        }finally {
            ossClient.close();
        }
        return content;
    }

    /**
     * @title getAllObject
     * @description 查询某个bucket里面的所有文件
     * @param bucketName bucket名称
     * @return List<String>  文件的key集合
     * @throws
     */
    public static List<String> getAllObject(String bucketName)throws Exception {
        ObsClient ossClient = getOssClient();
        List<String> results = new ArrayList<>();
        try {
            // ossClient.listObjects返回ObjectListing实例，包含此次listObject请求的返回结果。
            ObjectListing objectListing = ossClient.listObjects(bucketName);
            for (ObsObject object : objectListing.getObjects()) {
                results.add(object.getObjectKey());
            }
            return results;
        }finally {
            ossClient.close();
        }
    }

    public static String getPreviewUrl(String key)throws Exception {
        return getPreviewUrl(key,60*60);
    }

    public static String getPreviewUrl(String key,long expires)throws Exception{
        ObsClient ossClient = getOssClient();
        String prefix = getObjectPrefix(key);
        Map<String,String> headers = new HashMap<>();
        Map<String,Object> params = new HashMap<>();
        try{
            TemporarySignatureResponse temporarySignatureResponse = ossClient.createGetTemporarySignature(
                    bucketName,
                    key,
                    prefix,
                    expires,
                    headers,
                    params
            );
            return temporarySignatureResponse.getSignedUrl();
        }finally {
            ossClient.close();
        }
    }
}
