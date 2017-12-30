package com.racer.workerthread.gui;


import javax.swing.JLabel;

public class Service implements Runnable{
	private JLabel label;
	private int num;
	public Service(JLabel label, int num){
		this.label = label;
		this.num = num;
	}
	public void run(){
		label.setText("" + num);
	}
}