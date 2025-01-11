import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

// Get screen dimensions for responsiveness
export const screenHeight = Dimensions.get('screen').height / 100;
export const screenWidth = Dimensions.get('screen').width / 100;

interface CustomDatePickerProps {
  disableFuture?: boolean;
  disablePast?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ disableFuture = false, disablePast = false }) => {
  const currentDate = new Date(); // Get current date when component is mounted

  const [selectedDate, setSelectedDate] = useState<string | null>(currentDate.toDateString()); // Default selected date
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(currentDate); // Store the current month

  useEffect(() => {
    const days = getDaysInMonth(currentMonthDate); // Update days when month changes
    setDaysInMonth(days);
  }, [currentMonthDate]);

  // Get days of a given month and year
  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Handle selecting a day
  const handleSelectDay = (day: Date) => {
    setSelectedDate(day.toDateString());
    setShowDatePicker(false); // Close the date picker after selection
  };

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentMonthDate(prevDate => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentMonthDate(prevDate => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
  };

  // Format month and year for display
  const getMonthYear = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${monthName} ${year}`;
  };

  // Show the year picker modal
  const showYearList = () => {
    setShowYearPicker(true);
  };

  // Hide the year picker modal
  const hideYearList = () => {
    setShowYearPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setSelectedDate(new Date(year, currentMonthDate.getMonth(), 1).toDateString()); // Set the new selected date
    setCurrentMonthDate(new Date(year, currentMonthDate.getMonth(), 1)); // Update month with new year
    setShowYearPicker(false); // Close year picker
  };

  // Get list of years for the year picker (min year = 1990, max year = current year + 50)
  const getYearsList = () => {
    const years: number[] = [];
    const currentYear = new Date().getFullYear();
    const pastYears = 1990; // Min year = 1990
    const futureYears = currentYear + 50; // Max year = current year + 50

    for (let year = pastYears; year <= futureYears; year++) {
      if (
        (disableFuture && year > currentYear) || // Disable future years
        (disablePast && year < currentYear) // Disable past years
      ) {
        continue;
      }
      years.push(year);
    }

    return years;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>
          {selectedDate ? selectedDate : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {getMonthYear(currentMonthDate)}
                <Text style={styles.selectYearText} onPress={showYearList}>
                  {' '}
                  ({currentMonthDate.getFullYear()})
                </Text>
              </Text>

              {/* Calendar Days */}
              <View style={styles.calendarGrid}>
                {daysInMonth.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayBox,
                      selectedDate === day.toDateString()
                        ? styles.selectedDay
                        : null,
                    ]}
                    onPress={() => handleSelectDay(day)}>
                    <Text style={styles.dayText}>{day.getDate()}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={prevMonth}>
                  <Text style={styles.navButton}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextMonth}>
                  <Text style={styles.navButton}>{'>'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Year Picker Modal */}
      {showYearPicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showYearPicker}
          onRequestClose={hideYearList}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Year</Text>
              <ScrollView style={styles.yearListContainer}>
                {getYearsList().map((year, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.yearItem}
                    onPress={() => handleYearSelect(year)}>
                    <Text style={styles.yearText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={hideYearList}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 5,
  },
  dateButton: {
    backgroundColor: '#4caf50',
    paddingVertical: screenHeight * 2,
    paddingHorizontal: screenWidth * 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth * 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: screenWidth * 6,
    borderRadius: 10,
    width: screenWidth * 95,
    maxHeight: screenHeight * 70,
  },
  modalTitle: {
    fontSize: screenWidth * 5,
    fontWeight: '600',
    marginBottom: screenHeight * 2,
    textAlign: 'center',
  },
  selectYearText: {
    color: '#4caf50',
    fontSize: screenWidth * 3,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayBox: {
    width: (screenWidth * 70) / 7 - screenWidth * 2, // Each box takes up 1/7th of the container
    height: screenHeight * 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: screenWidth * 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: screenWidth * 4,
    color: '#333',
  },
  selectedDay: {
    backgroundColor: '#4caf50',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: screenHeight * 2,
  },
  navButton: {
    fontSize: screenWidth * 5,
    color: '#4caf50',
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingVertical: screenHeight * 2,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: screenHeight * 3,
  },
  yearListContainer: {
    maxHeight: screenHeight * 40,
  },
  yearItem: {
    padding: screenHeight * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  yearText: {
    fontSize: screenWidth * 4,
    color: '#333',
  },
});
