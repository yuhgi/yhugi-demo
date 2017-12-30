package com.racer.proxy.virtualproxy;
import java.awt.*;
import javax.swing.*;
import java.net.*;
import java.awt.event.*;
import java.util.*;

public class ImageProxyTestDrive{
	ImageComponent imageComponent;
	JFrame frame = new JFrame("CD Cover Viewer");
	JMenuBar menuBar;
	JMenu menu;
	Hashtable<String,String> cds = new Hashtable<String,String>();
	public static void main(String[] args)throws Exception {
		new ImageProxyTestDrive(); 	
	} 
	public ImageProxyTestDrive(){
		cds.put("G nai1","http://image.tianjimedia.com/uploadImages/2015/069/26/631940XLN391_680x500.jpg");
		cds.put("G nai2","http://image.tianjimedia.com/uploadImages/2015/069/29/Z410P6Q0YY1A_680x500.jpg");
		try{
			URL initialUrl=new URL((String)cds.get("G nai1"));
			menuBar=new JMenuBar();
			menu=new JMenu("Favorite Pictures...");
			menuBar.add(menu);
			frame.setJMenuBar(menuBar);

			for(Enumeration<String> e=cds.keys();e.hasMoreElements();){
				String name=e.nextElement();
				JMenuItem menuItem=new JMenuItem(name);
				menu.add(menuItem);
				menuItem.addActionListener(new ActionListener(){
					public void actionPerformed(ActionEvent event){
						//使用代理显示图片
						imageComponent.setIcon(new ImageProxy(getCDUrl(event.getActionCommand())));
						frame.repaint();
					}
				});
			}

			Icon icon=new ImageProxy(initialUrl);
			imageComponent = new ImageComponent(icon);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		frame.getContentPane().add(imageComponent);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(800,600);
		frame.setVisible(true);
	}

	URL getCDUrl(String name){
		try{
			return new URL(cds.get(name));
		}
		catch(MalformedURLException e){
			e.printStackTrace();
			return null;
		}
	}
}