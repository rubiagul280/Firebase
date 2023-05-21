/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

const IMAGES = [
  require('../assets/images/image1.jpg'),
  require('../assets/images/image2.jpg'),
  require('../assets/images/image3.jpg'),
  require('../assets/images/image4.jpg'),
  require('../assets/images/image5.jpg'),
  require('../assets/images/image6.jpg'),
  require('../assets/images/image7.jpg'),
  require('../assets/images/image8.jpg'),
  require('../assets/images/image9.jpg'),
  require('../assets/images/image10.jpg'),
];

const PUZZLE_SIZE = {
  easy: 3,
  medium: 4,
  hard: 5,
};

export default function Game({navigation}) {
  const [level, setLevel] = useState('easy');
  const [imageIndex, setImageIndex] = useState(0);
  const [puzzle, setPuzzle] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const generatePuzzle = (size) => {
    const pieces = [];
    for (let i = 0; i < size; i++) {
      pieces.push([]);
      for (let j = 0; j < size; j++) {
        pieces[i].push(i * size + j);
      }
    }
    return pieces;
  };

  const shufflePuzzle = (pieces) => {
    const size = pieces.length;
    for (let i = size - 1; i >= 0; i--) {
      for (let j = size - 1; j >= 0; j--) {
        const randomIndex1 = Math.floor(Math.random() * size);
        const randomIndex2 = Math.floor(Math.random() * size);
        const temp = pieces[i][j];
        pieces[i][j] = pieces[randomIndex1][randomIndex2];
        pieces[randomIndex1][randomIndex2] = temp;
      }
    }
    return pieces;
  };

  const handlePressPiece = (row, col) => {
    if (!gameOver) {
      const newPuzzle = [...puzzle];
      const size = newPuzzle.length;
      const emptyRow = newPuzzle.findIndex((row) => row.includes(size * size - 1));
      const emptyCol = newPuzzle[emptyRow].indexOf(size * size - 1);
      if (row === emptyRow && Math.abs(col - emptyCol) === 1 ||
          col === emptyCol && Math.abs(row - emptyRow) === 1) {
        newPuzzle[emptyRow][emptyCol] = newPuzzle[row][col];
        newPuzzle[row][col] = size * size - 1;
        setPuzzle(newPuzzle);
        if (checkGameOver(newPuzzle)) {
          setGameOver(true);
          Alert.alert('Congratulations! You solved the puzzle!');
        }
      }
    }
  };

  const checkGameOver = (pieces) => {
    const size = pieces.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (pieces[i][j] !== i * size + j) {
          return false;
        }
      }
    }
    return true;
  };

  const handlePressNext = () => {
    const newIndex = imageIndex + 1;
    if (newIndex < IMAGES.length) {
      setImageIndex(newIndex);
      setPuzzle(shufflePuzzle(generatePuzzle(PUZZLE_SIZE[level])));
      setGameOver(false);
    }
  };

  const handlePressLevel = (newLevel) => {
    if (newLevel !== level) {
      setLevel(newLevel);
      setImageIndex(0);
      setPuzzle(shufflePuzzle(generatePuzzle(PUZZLE_SIZE[newLevel])));
      setGameOver(false);
    }
  };

  const renderPuzzlePiece = (number, row, col, size) => {
    const pieceWidth = 300 / size;
    const pieceHeight = 300 / size;
    const imageWidth = 600;
    const imageHeight = 600;
    const source = IMAGES[imageIndex];
    const x = (number % size) * pieceWidth;
    const y = Math.floor(number / size) * pieceHeight;
    const offsetX = (number % size) * (imageWidth / size);
    const offsetY = Math.floor(number / size) * (imageHeight / size);

    return (
      <TouchableOpacity
        key={number}
        style={[
          styles.piece,
          {
            width: pieceWidth,
            height: pieceHeight,
            transform: [
              { translateX: x },
              { translateY: y },
            ],
          },
        ]}
        onPress={() => handlePressPiece(row, col)}
      >
        <Image
          source={source}
          style={{
            width: imageWidth,
            height: imageHeight,
            transform: [
              { translateX: -offsetX },
              { translateY: -offsetY },
            ],
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderPuzzle = () => {
    const size = puzzle.length;
    return (
      <View style={styles.puzzleContainer}>
        {puzzle.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((col, colIndex) =>
              renderPuzzlePiece(col, rowIndex, colIndex, size)
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jigsaw Puzzle Game</Text>
      <View style={styles.levelsContainer}>
        <TouchableOpacity
          style={[
            styles.levelButton,
            level === 'easy' && styles.selectedLevelButton,
          ]}
          onPress={() => handlePressLevel('easy')}
        >
          <Text style={styles.levelButtonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            level === 'medium' && styles.selectedLevelButton,
          ]}
          onPress={() => handlePressLevel('medium')}
        >
          <Text style={styles.levelButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.levelButton,
            level === 'hard' && styles.selectedLevelButton,
          ]}
          onPress={() => handlePressLevel('hard')}
        >
          <Text style={styles.levelButtonText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={IMAGES[imageIndex]} style={styles.image} />
      </View>
      {renderPuzzle()}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handlePressNext}
        disabled={gameOver}
      >
        <Text style={styles.nextButtonText}>Next Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
  selectedLevelButton: {
    backgroundColor: 'lightblue',
  },
  levelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  puzzleContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  piece: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
