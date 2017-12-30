package com.racer.mvc.dj;

import com.racer.mvc.dj.model.*;
import com.racer.mvc.dj.controller.*;

public class DJTestDrive{
    public static void main(String[] args) {
        BeatModelInterface model = new BeatModel();
        ControllerInterface controller = new BeatController(model);
    }
}