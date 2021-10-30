import React, { useEffect, useState, useMemo } from "react";
import {
    Box,
    Typography,
  } from "@material-ui/core";

interface Props {
  endTime: string
}
export const TriviaTimer = (props: Props) => {
  const {endTime} = props;

  useEffect(() => 
  {
    console.log('enter game');
  }, [])

  return (
    <Box>
      Timer
    </Box>
  )
}