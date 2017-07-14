#!/bin/bash

function build {
    #npm install && npm test &&
    npm prune --production
}

function package {
    aws cloudformation package \
        --template-file ${TEMPLATE_FILE} \
        --output-template-file ${TEMPLATE_OUTPUT_FILE} \
        --s3-bucket ${S3_BUCKET_NAME}
}

function deploy {
    aws cloudformation deploy \
        --template-file  ${TEMPLATE_OUTPUT_FILE} \
        --stack-name ${STACK_NAME} \
        --capabilities CAPABILITY_IAM
}

TEMPLATE_FILE='./cloudformation.yaml'
TEMPLATE_OUTPUT_FILE='cloudformation-output.yaml'

STACK_NAME='notepad-api'
S3_BUCKET_NAME='deployer-build'

#build &&
package && deploy