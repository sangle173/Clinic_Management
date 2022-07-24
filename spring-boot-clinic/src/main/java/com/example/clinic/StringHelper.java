package com.example.clinic;

import org.apache.commons.lang3.StringUtils;

public class StringHelper {
    public static String standardizedString(String string) {
        String resultStr = string.replaceAll("[ ]+", " ").trim().toLowerCase();
        String[] stringList = resultStr.split(" ");
        String result = "";
        String temp = "";
        for (int i = 0; i < stringList.length; i++) {
            temp = StringUtils.capitalize(stringList[i]);
            result += " " + temp;
        }
        return result.trim();
    }
}
