package com.yuhgi.learningspark

import org.apache.spark._
import org.apache.spark.SparkContext._

object BasicWordCount{
    def main(args: Array[String]){
        val inputFile = args(0)
        val outputFile = args(1)

        val conf = new SparkConf().setMaster("local").setAppName("wordCount")
        val sc = new SparkContext(conf)
        val input =  sc.textFile(inputFile)
        // Split up into words.
        val words = input.flatMap(line => line.split(" "))
        // Transform into word and count.
        val counts = words.map(word => (word, 1)).reduceByKey{case (x, y) => x + y}
        val c = counts.collect()
        print(counts.collect())
        // Save the word count back out to a text file, causing evaluation.
        // counts.saveAsTextFile(outputFile)
    }
}

