import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ContactUs from './Pages/ContactUs';


// Mocking Axios to prevent actual API calls during testing
jest.mock('axios');

// Mock data for testing
const mockSubmissions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Test message 1' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', message: 'Test message 2' },
];

// Mock Axios get function for fetching submissions
axios.get.mockResolvedValue({ data: mockSubmissions });

// Mock Axios put function for updating submission
axios.put.mockResolvedValue({ data: {} });

// Mock Axios delete function for deleting submission
axios.delete.mockResolvedValue({ data: {} });

// Mock Axios post function for adding new submission
axios.post.mockResolvedValue({ data: {} });

describe('ContactUs component', () => {
  test('renders submissions correctly', async () => {
    render(<ContactUs/>);

    // Wait for the component to fetch data
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check if submissions are rendered correctly
    mockSubmissions.forEach(submission => {
      expect(screen.getByDisplayValue(submission.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(submission.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(submission.message)).toBeInTheDocument();
    });
  });

  test('handles submission updates', async () => {
    render(<ContactUs />);

    // Wait for the component to fetch data
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Mock updated submission data
    const updatedSubmission = { id: 1, name: 'Updated Name', email: 'updated@example.com', message: 'Updated message' };

    // Mock the Axios put function for updating submission
    axios.put.mockResolvedValueOnce({ data: updatedSubmission });

    // Trigger save button click for the first submission
    fireEvent.click(screen.getAllByText('Save')[0]);

    // Wait for the component to update data
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));

    // Check if the submission is updated in the UI
    expect(screen.getByDisplayValue(updatedSubmission.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(updatedSubmission.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(updatedSubmission.message)).toBeInTheDocument();
  });

  // Similarly, you can write tests for deletion and addition functionalities
});
