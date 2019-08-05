package com.yuhgi.converter;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;

import java.awt.image.BufferedImage;
import java.io.OutputStream;
import java.util.ArrayList;

public class PdfConverter {
    public ArrayList<BufferedImage> pdfToJpg(byte[] bytes) throws Exception{
        PDDocument pd = PDDocument.load(bytes);
        PDFRenderer pdfRenderer = new PDFRenderer(pd);
        ArrayList<BufferedImage> images = new ArrayList<>();
        for(int page=0;page<pd.getNumberOfPages();page++){
            BufferedImage bufferedImage = pdfRenderer.renderImageWithDPI(page,180, ImageType.RGB);
            images.add(bufferedImage);
        }
        pd.close();
        return images;
    }

}
