/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { View, Image, StyleSheet, PanResponder } from 'react-native';

const imageSource = require('../assets/images/image2.jpg');
const NUM_ROWS = 3;
const NUM_COLS = 3;

const PuzzleGame = () => {
  const [layout, setLayout] = useState(null);
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    initializePieces();
  }, [layout]);

  const initializePieces = () => {
    if (layout) {
        const tempPieces = [];
        const pieceWidth = layout.width / NUM_COLS;
        const pieceHeight = layout.height / NUM_ROWS;
        let index = 0;
  
        for (let row = 0; row < NUM_ROWS; row++) {
          for (let col = 0; col < NUM_COLS; col++) {
            const left = col * pieceWidth;
            const top = row * pieceHeight;
            const piece = {
              index,
              originalPosition: { left, top },
              currentPosition: { left, top },
              style: {
                position: 'absolute',
                width: pieceWidth,
                height: pieceHeight,
                left,
                top,
              },
            };
            tempPieces.push(piece);
            index++;
          }
        }
  
        setPieces(tempPieces);
      }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      const newPieces = pieces.map((piece) => {
        return {
          ...piece,
          currentPosition: {
            left: piece.originalPosition.left + dx,
            top: piece.originalPosition.top + dy,
          },
        };
      });
      setPieces(newPieces);
    },
    onPanResponderRelease: () => {
      // Check if the puzzle is solved
      // You can implement your own logic here

      // Reset the positions if not solved
      const newPieces = pieces.map((piece) => {
        return {
          ...piece,
          currentPosition: { ...piece.originalPosition },
        };
      });
      setPieces(newPieces);
    },
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => setLayout(event.nativeEvent.layout)}
    >
        <Text>Pummmmmmmmmmmmmm</Text>
      {pieces.map((piece) => (
        <Image
          key={piece.index}
          source={imageSource}
          style={[styles.piece, piece.style]}
          {...panResponder.panHandlers}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  piece: {
    resizeMode: 'contain',
  },
});

export default PuzzleGame;
