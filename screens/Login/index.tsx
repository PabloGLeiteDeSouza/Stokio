import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

type LoginScreenProps = {
    navigation: StackNavigationProp< any, 'login' >;
    route: RouteProp< any, 'login' >;
};

export default function Login({navigation, route}: LoginScreenProps) {
    return (
        <>
        </>
    )
}