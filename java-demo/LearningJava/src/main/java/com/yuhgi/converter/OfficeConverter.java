package com.yuhgi.converter;

import jdk.internal.util.xml.impl.Input;
import org.jodconverter.LocalConverter;
import org.jodconverter.document.DefaultDocumentFormatRegistry;
import org.jodconverter.job.ConversionJobWithOptionalSourceFormatUnspecified;
import org.jodconverter.job.ConversionJobWithRequiredSourceFormatUnspecified;
import org.jodconverter.office.OfficeManager;

import java.io.*;

public class OfficeConverter {
    private LocalConverter converter;
    public OfficeConverter(OfficeManager officeManager){
        this.converter = LocalConverter.make(officeManager);
    }
    public OutputStream docToPdf(InputStream inputStream) throws Exception{
        OutputStream outputStream = new ByteArrayOutputStream();

        this.converter.convert(inputStream)
                .as(DefaultDocumentFormatRegistry.DOC)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;
    }
    public OutputStream docxToPdf(File inputStream) throws Exception{
        OutputStream outputStream = new ByteArrayOutputStream();

        this.converter.convert(inputStream)
                .as(DefaultDocumentFormatRegistry.DOCX)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;
    }
    public OutputStream pptToPdf(File inputStream) throws Exception{
        OutputStream outputStream = new ByteArrayOutputStream();

        this.converter.convert(inputStream)
                .as(DefaultDocumentFormatRegistry.PPT)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;
    }
    public OutputStream pptxToPdf(File inputStream) throws Exception{
        OutputStream outputStream = new ByteArrayOutputStream();

        this.converter.convert(inputStream)
                .as(DefaultDocumentFormatRegistry.PPTX)
                .to(outputStream)
                .as(DefaultDocumentFormatRegistry.PDF)
                .execute();

        return outputStream;
    }

}
