import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';

// Get screen dimensions for responsiveness
const screenHeight = Dimensions.get('screen').height / 100;
const screenWidth = Dimensions.get('screen').width / 100;

const CustomCalenderPicker: React.FC = () => {
  // Initialize date states
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear(),
  );

  useEffect(() => {
    const days = getDaysInMonth(currentDate);
    setDaysInMonth(days);
  }, [currentDate]);

  // Get days of a given month and year
  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
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
  };

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Format month and year for display
  const getMonthYear = (date: Date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
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

  // Select a year
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setShowYearPicker(false);
    setCurrentDate(new Date(year, currentDate.getMonth(), 1)); // Reset month to current month
  };

  // Get all years to display
  const yearsList = () => {
    const years: number[] = [];
    const startYear = 2020; // Start year for example
    const endYear = 2030; // End year for example

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <View style={styles.container}>
      {selectedDate && (
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate}
        </Text>
      )}

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear} onPress={showYearList}>
          {getMonthYear(currentDate)}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Days */}
      <View style={styles.calendarGrid}>
        {daysInMonth.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBox,
              selectedDate === day.toDateString() ? styles.selectedDay : null,
            ]}
            onPress={() => handleSelectDay(day)}>
            <Text style={styles.dayText}>{day.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
                {yearsList().map((year, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.yearItem}
                    onPress={() => handleYearSelect(year)}>
                    <Text style={styles.yearText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={hideYearList}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CustomCalenderPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 4, // Use screen width for responsive padding
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
    marginBottom: screenHeight * 2, // Adjusted margin
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 2, // Adjusted margin
  },
  navButton: {
    fontSize: screenWidth * 6, // Responsive size
    color: '#4caf50',
    marginHorizontal: screenWidth * 5, // Adjusted margin
  },
  monthYear: {
    fontSize: screenWidth * 5, // Responsive size
    fontWeight: '500',
    color: '#333',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth * 90, // Responsive width
    justifyContent: 'flex-start',
    backgroundColor: 'fefefe',
  },
  dayBox: {
    // width: (screenWidth * 90) / 7 - screenWidth * 1, // Adjust width based on screen
    width: screenWidth * 12, // Responsive width
    height: screenWidth * 12, // Responsive height
    justifyContent: 'center',
    alignItems: 'center',
    margin: screenWidth * 1, // Adjusted margin
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: screenWidth * 60,
    backgroundColor: '#fff',
  },
  dayText: {
    fontSize: screenWidth * 4, // Responsive font size
    color: '#333',
  },
  selectedDay: {
    backgroundColor: '#4caf50',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: screenWidth * 5, // Adjust padding based on screen
    borderRadius: 10,
    width: screenWidth * 90, // Responsive width
    maxHeight: screenHeight * 40, // Maximum height
  },
  modalTitle: {
    fontSize: screenWidth * 5, // Responsive font size
    fontWeight: '600',
    marginBottom: screenHeight * 2, // Adjust margin
  },
  yearListContainer: {
    maxHeight: screenHeight * 25, // Maximum height for scrollable list
  },
  yearItem: {
    padding: screenHeight * 2, // Adjust padding
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  yearText: {
    fontSize: screenWidth * 4, // Responsive font size
    color: '#333',
  },
  closeButton: {
    color: '#4caf50',
    textAlign: 'center',
    marginTop: screenHeight * 2, // Adjust margin
    fontWeight: '600',
  },
});
