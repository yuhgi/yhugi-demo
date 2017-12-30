package com.racer.proxy.virtualproxy;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import java.net.URL;
import java.awt.Graphics;
import java.awt.Component;

class ImageProxy implements Icon{
	ImageIcon imageIcon;
	URL imageUrl;
	Thread retrievalThread;
	boolean retrieving=false;

	public ImageProxy(URL url){
		this.imageUrl=url;
	}

	public int getIconWidth(){
		if(imageIcon!=null)
			return imageIcon.getIconWidth();
		else
			return 800;
	}

	public int getIconHeight(){
		if(imageIcon!=null)
			return imageIcon.getIconHeight();
		else
			return 600;
	}

	public void paintIcon(final Component c,Graphics g, int x,int y){
		if(imageIcon!=null){
			imageIcon.paintIcon(c,g,x,y);

			System.out.println("Using Proxy ,imageIcon is not null");
		}
		else{
			g.drawString("Loading CD Cover, please wait...",x+300,y+190);
			if(!retrieving){
				retrieving=true;
				retrievalThread=new Thread(new Runnable(){
					public void run(){
						try{
							imageIcon=new ImageIcon(imageUrl,"CD Cover");
							System.out.println("Get the image, repaint");
							c.repaint();
						}
						catch(Exception e){
							e.printStackTrace();
						}
					}
				});
				retrievalThread.start();
			}
		}

	}
}