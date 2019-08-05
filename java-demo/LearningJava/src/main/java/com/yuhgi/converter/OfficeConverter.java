package com.yuhgi.converter;

import org.jodconverter.LocalConverter;
import org.jodconverter.document.DefaultDocumentFormatRegistry;
import org.jodconverter.office.OfficeManager;

import java.io.*;

public class OfficeConverter {

    private LocalConverter converter;
    public static String list[] = {".doc",".docx",".ppt",".pptx"};

    public OfficeConverter(OfficeManager officeManager){
        this.converter = LocalConverter.make(officeManager);
    }
    public boolean isSupportedFormat(String fileExtension){
        for(String s:list){
            if(s.equals(fileExtension)){
                return true;
            }
        }
        return false;
    }
    public ByteArrayOutputStream officeToPdf(InputStream inputStream,String fileExtension) throws Exception{
        if(!isSupportedFormat(fileExtension)){
            throw new Exception(fileExtension+" is not supported format.");
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        org.jodconverter.document.DocumentFormat formatRegistry;

        switch (fileExtension){
            case ".doc":
                formatRegistry = DefaultDocumentFormatRegistry.DOC;
                break;
            case ".docx":
                formatRegistry = DefaultDocumentFormatRegistry.DOCX;
                break;
            case ".ppt":
                formatRegistry = DefaultDocumentFormatRegistry.PPT;
                break;
            case ".pptx": {
                formatRegistry = DefaultDocumentFormatRegistry.PPTX;
                break;
            }
            default:formatRegistry = DefaultDocumentFormatRegistry.DOC;
        }
        this.converter.convert(inputStream)
                .as(formatRegistry)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;

    }
    public ByteArrayOutputStream officeToPdf(File file) throws Exception{
        String fileName = file.getName();
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        if(!isSupportedFormat(fileExtension)){
            throw new Exception(fileExtension+" is not supported format.");
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        this.converter.convert(file)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;

    }

}
