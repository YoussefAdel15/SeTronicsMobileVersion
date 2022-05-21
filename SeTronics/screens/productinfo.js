import React, { useEffect, useState } from 'react';
import {View, Text,StatusBar,ScrollView,Animated,Dimensions,TouchableOpacity,Image,FlatList} from 'react-native';
import { COLOURS, Items } from './DB/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native-web';

const ProductInfo =({route,navigation})=>{
    
    const {productID} =route.params;

    const [product,setProduct] = useState({})

    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);


    let position = Animated.divide(scrollX,width)

    //the effect happen when getting the database listenning
    useEffect(()=> {
        const unSubscribe = navigation.addListener('focus',()=> {
            getDataFormDB();
        });
        return()=>{
            cleanup
        }
    },[navigation])

    //get product data by the productID
    const getDataFormDB=async ()=> {
        for (let index = 0; index < item.length; index++) {
            if (item[index].id ==productID) {
                await setProduct(Items[index]);
                return;
            }
        }
    };

    // add to cart
    const addToCart = async id=> {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray)
        if (itemArray) {
            let array = itemArray
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItem',JSON.stringify(array));
                ToastAndroid.show(
                    "Item Added Successfully to the cart",
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home')
            } catch (error) {
                return error;
            }
        }
        else{
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItems',JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added successfully to the cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        }
    }

    // product horizontal scroll product card

    const renderProduct=(item,index) =>{

        return (
            <View style={{
                width:width,
                height: 240,
                alignItems:'center',
                justifyContent:'center',

            }} >
                <Image source={item} style={{
                    width:'100%' ,
                    height:'100%' ,
                    resizeMode:'contain',


                    }} />
            </View>
        )
    };


    //You can test with this log line that when u press the product you will see the page of the product itself in the navigation
    //as the product name will be printed in the specific page
    console.log(product);
    return(
        <View 
            style={{
                width:'100%',
                height:'100%',
                backgroundColor:COLOURS.white,
                position:'relative',
            }
        }>
            {/* getting the navigation routing 
            right now we are calling the products to a view tag in the text tag as we cant display them without a text tag 
            dont forget to change the product ID as we call it differently  */}
            <Text>ProductInfo(ProducctID)</Text>
            <StatusBar backgroundColor={Colours.backgroundLight} barstyle= "dark-content"/>
            <ScrollView>
                <View style={{
                    width:'100%',
                    backgroundColor:COLOURS.backgroundLight,
                    borderBottomRightRadius:20,
                    borderBottomLeftRadius:20,
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:4,


                }}>
                    <View style={{
                        width:'100%',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingTop:16,
                        paddingLeft:16,                         
                    }}>
                        <TouchableOpacity>
                            <Entypo name='cheveron-left'
                             style={{
                                fontSize:18,
                                color:COLOURS.backgroundDark,
                                padding:12,
                                backgroundColor:COLOURS.white,
                                borderRadius:10,

                            }} />
                        </TouchableOpacity>
                    </View>
                     {/*//the flat list tag is used to make the render faster as the displayed items are the only displayed or rendered others will be rendered when they are scrolled  */}
                        <FlatList
                        // if no image it wont show one value will be null  
                        data={product.productImageList ? product.productImageList: null}
                        horizontal
                        renderItem={renderProduct}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={width}
                        bounces={false}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x:scrollX}}}],
                            {useNativeDriver: false},
                        )}
                    />
                    <View style={{
                        width:'100%',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        marginBottom:16,
                        marginTop:32,
                    }}>
                        {
                            product.productImageList 
                            ?
                                product.productImageList.map((data,index)=> {
                                    let opacity = position.interpolate({
                                        inputRange: [index-1,index,index+1],
                                        outputRange:[0.2,1,0.2],
                                        extrapolate:'clamp'
                                    })
                                    
                                    return(
                                        <Animated.View
                                        key={index} 
                                            style={{
                                                width:'16%',
                                                height:2.4,
                                                backgroundColor:COLOURS.black,
                                                opacity,
                                                marginHorizontal:4,
                                                borderRadius:100, 
                                                marginBottom:4
                                        }}>

                                        </Animated.View>
                                    )
                                })
                            :null
                        }
                    </View>
                    {/* right here we fill the product page as the previous code was about to make the product image and the scroll over the multi images products and now we are filling the actual info about the product */}
                    <View 
                        style={{
                            paddingHorizontal:16,
                            marginTop:6,
                        }} >
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginVertical:14,
                        }}>
                            <Entypo name='shopping cart' 
                                style={{
                                    fontSize:18,color:COLOURS.blue,
                                    marginRight:6,
                                }} 
                            />
                            <Text style={{
                                fontSize:12,
                                color:COLOURS.black,
                                
                            }}>
                                shopping
                            </Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            marginVertical:4,

                        }}>
                            {/* we generate the product name as it differ from a product page to another  */}
                            <Text style={{
                                fontSize:24,
                                fontWeight:'600',
                                letterSpacing:0.5,
                                marginVertical:4,
                                color:COLOURS.black,
                                maxWidth:'84%',

                            }}>
                                {product.productName}
                            </Text> 
                            <Ionicons name='link-outline' style={{
                                fontSize:24,
                                color:COLOURS.blue,
                                // marginRight:6,
                                backgroundColor:COLOURS.blue+10 ,
                                padding:8,
                                borderRadius:100,
                                alignItems:'center',
                                justifyContent:'space-between',

                            }} />
                        </View>
                        <Text style={{
                            fontSize:12,
                            color:COLOURS.black,
                            fontWeight:'400',
                            letterSpacing:1,
                            opacity:0.5,
                            lineHeight:20,
                            maxWidth:'85%',
                            maxHeight:44,
                            marginBottom:18,
                        }} >
                            {/* change the word description wit hthe word that you name it as the description for each product in the database */}
                            {product.description}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            marginVertical:14,
                            borderBottomColor:COLOURS.backgroundLight,
                            borderBottomWidth:1,
                            paddingBottom:20,

                        }}>
                        <View style={{
                            flexDirection:'row',
                            width:'80%',
                            alignItems:'center',

                        }}>
                            <View style={{
                                color:COLOURS.blue,
                                backgroundColor:COLOURS.backgroundLight,
                                alignItems:'center',
                                padding:12,
                                borderRaduis:100,
                                marginRight:10,

                                }}>
                                <Entypo name='location-pin' style={{
                                    fontSize:16, color:COLOURS.blue
                                }} />
                            </View>
                            <Text> Rustaveli Ave 57, {'\n'}17-001, Batume OR you can just say cairo uni </Text>
                        </View>
                        </View>
                        <Entypo name='cheveron or any name ' style={{
                            fontSize:22,
                            color:COLOURS.backgroundDark,
                            
                        }} />   
                    </View>
                    {/* the price of the prdouct with the currency sign  */}
                    <View style={{
                        paddingHorizontal:16,
                    }} >
                        <Text style={{
                            fontSize:18,
                            fontWeight:500,
                            maxWidth:'85%',
                            color:COLOURS.black,
                            marginBottom:4,
                        }} >
                            &#8377; {product.price}.00
                        </Text>
                        {/* this one is opptional we can make it the delivery taxes or any fuckin thing */}
                        <Text>
                        Tax Rate 2%~ {/*the sign of the currency*/} {product.productPrice /20} {/**the sign  */}
                        {product.productPrice +product.productPrice /20}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                position:'relative',
                bottom:10,
                height:'8%',
                width:'100%',
                justifyContent:'center',
                alignItems:'center'
            }} >
                {/* this once to be avilable to the customer to add the product to the cart to procced the sale or it tells the customer that out of stock  */}
                <TouchableOpacity 
                    onPress={()=> product.isAvailable ? addToCart(product.id):null}
                    style={{
                        width:'86%',
                        height:'90%',
                        backgroundColor:COLOURS.blue,
                        borderRadius:20,
                        justifyContent:'center',
                        alignItems:'center',
                        
                }} >
                    <Text style={{
                        fontSize:12,
                        fontWeight:'500',
                        letterSpacing:1,
                        color:COLOURS.white,
                        textTransform:'uppercase',

                    }} >
                        {product.isAvailable ? "Add to cart" : "Out of stock"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductInfo;