package edu.brown.cs32.Records;

public record CountyState(String state, String county) {
    public String toOurServerParams() {
        return "for=county:" + county + "&in=state:" + state;
    }
}
