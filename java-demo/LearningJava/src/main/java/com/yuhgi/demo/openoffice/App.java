package com.yuhgi.demo.openoffice;

import org.jodconverter.LocalConverter;
import org.jodconverter.OfficeDocumentConverter;
import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeManager;

import java.io.File;

public class App {
    public static void main(String[] args) throws Exception{
        File docInput = new File("/tmp/test2.docx");
        File pptInput = new File("/tmp/test.pptx");
        File docOutput = new File("/tmp/test1.pdf");
        File pptOutput = new File("/tmp/test3.pdf");
        OfficeManager officeManager = LocalOfficeManager.builder()
                .officeHome("/opt/openoffice4/")
                .portNumbers(2002,2003,2004,2005)
                .build();
        officeManager.start();

        LocalConverter converter = LocalConverter.make(officeManager);
        converter.convert(docInput).to(docOutput).execute();
        converter.convert(pptInput).to(pptOutput).execute();
        //停止服务
        officeManager.stop( );
    }
}
