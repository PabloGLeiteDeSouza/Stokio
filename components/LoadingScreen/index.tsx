import { Box, Spinner, Text, VStack } from "@gluestack-ui/themed"
import React from 'react'

export default function LoadingScreen() {
    return(
        <Box w='$full' h='$full' alignItems='center' justifyContent='center' >
            <VStack gap={15}>
                <Spinner size='large' />
                <Text >O aplicativo esta iniciando</Text>
            </VStack>
        </Box>
    )
}