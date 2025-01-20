import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { screenHeight } from "./CustomDatePicker";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const WheelOfPrize = () => {
  // Dynamic prizes and colors
  const [prizes, setPrizes] = useState(["$10", "$50", "Try Again", "$100", "$200", "$200", "$0", ]);
  const [colors, setColors] = useState(["red", "green", "yellow", "pink", "orange", "gray", "blue",]);

  const numberOfSegments = prizes.length;
  const [anglePerSegment, setAnglePerSegment] = useState(360 / numberOfSegments); // Angle per slice
  const rotation = useRef(new Animated.Value(0)).current;
  const [currentPrize, setCurrentPrize] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [stoppingAngle, setStoppingAngle] = useState(0); // Default stopping angle is 0 degrees
  const [inputAngle, setInputAngle] = useState(""); // Store user-provided angle value

  // Recalculate anglePerSegment whenever the number of segments changes
  useEffect(() => {
    setAnglePerSegment(360 / numberOfSegments);
  }, [prizes]); // This will re-run whenever the prizes array changes

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);

    // Shuffle the prizes and colors randomly before each spin
    const shuffledPrizes = shuffleArray([...prizes]);
    const shuffledColors = shuffleArray([...colors]);
    setPrizes(shuffledPrizes);
    setColors(shuffledColors);

    // Get the user-defined stopping angle (ensure it's within 0-360 degrees range)
    let desiredAngle = parseInt(inputAngle);
    if (isNaN(desiredAngle) || desiredAngle < 0 || desiredAngle >= 360) {
      alert("Please enter a valid angle between 0 and 360.");
      setSpinning(false);
      return;
    }

    // Reset rotation and simulate multiple full rotations for a realistic spin
    rotation.setValue(0);

    // Adjust stopping point to the provided angle
    const totalSpinValue = 3600 + desiredAngle; // 3600 (10 full rotations) + user-specified angle

    // Animate the wheel to stop at the provided angle
    Animated.timing(rotation, {
      toValue: totalSpinValue,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      // Get the final normalized angle
      const finalRotation = totalSpinValue % 360;
      const normalizedRotation = (360 - finalRotation) % 360;

      // Calculate the index of the prize based on the stopping angle
      const prizeIndex = Math.floor(normalizedRotation / anglePerSegment) % numberOfSegments;

      const winningPrize = shuffledPrizes[prizeIndex];
      const winningColor = shuffledColors[prizeIndex];

      setCurrentPrize(`Prize: ${winningPrize}, Color: ${winningColor}`);
      setStoppingAngle(normalizedRotation); // Display the final stopping angle

      setSpinning(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        {/* Pointer */}
        <View
          style={{
            position: "absolute",
            top: screenHeight * 13.5,
            right: 0,
            width: 100,
            height: 10,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        ></View>

        {/* Wheel */}
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <Svg width={300} height={300} viewBox="0 0 300 300">
            <G rotation={-anglePerSegment / 2} origin="150, 150">
              {prizes.map((prize, index) => {
                const startAngle = index * anglePerSegment;
                const endAngle = startAngle + anglePerSegment;
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                const x1 = 150 + 150 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 150 + 150 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 150 + 150 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 150 + 150 * Math.sin((Math.PI * endAngle) / 180);

                return (
                  <Path
                    key={index}
                    d={`M150,150 L${x1},${y1} A150,150 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={colors[index % colors.length]}
                    stroke="#000"
                  />
                );
              })}
              {prizes.map((prize, index) => {
                const angle = index * anglePerSegment + anglePerSegment / 2;
                const x = 150 + 100 * Math.cos((Math.PI * angle) / 180);
                const y = 150 + 100 * Math.sin((Math.PI * angle) / 180);
                return (
                  <SvgText
                    key={index}
                    x={x}
                    y={y}
                    fill="#fff"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {prize}
                  </SvgText>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>

      {/* Input Field to Set Desired Stopping Angle */}
      <TextInput
        style={styles.angleInput}
        placeholder="Enter stopping angle (0-360)"
        keyboardType="numeric"
        value={inputAngle}
        onChangeText={setInputAngle}
      />

      {/* Spin Button */}
      <TouchableOpacity onPress={spinWheel} style={styles.spinButton} disabled={spinning}>
        <Text style={styles.spinButtonText}>Spin</Text>
      </TouchableOpacity>

      {/* Winning Prize */}
      {currentPrize !== "" && <Text style={styles.prizeText}>{currentPrize}</Text>}

      {/* Stopping Angle Display */}
      {stoppingAngle !== null && (
        <Text style={styles.angleText}>Stopping Angle: {stoppingAngle.toFixed(2)}°</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  wheelContainer: { marginBottom: 20, position: "relative" },
  spinButton: { backgroundColor: "#007BFF", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 },
  spinButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  prizeText: { marginTop: 20, fontSize: 24, fontWeight: "bold", color: "#333" },
  angleText: { marginTop: 20, fontSize: 18, fontWeight: "bold", color: "#333" },
  angleInput: { marginTop: 20, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "#ccc", width: 200, textAlign: "center" },
});

export default WheelOfPrize;
