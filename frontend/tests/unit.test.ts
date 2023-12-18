// Front end unit tests

// Track Display Tests

// TrackDisplay.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrackDisplay } from './TrackDisplay';

describe('addSong function', () => {
  test('should add a new song to the list', () => {
    render(<TrackDisplay />);

    // Simulate adding a new song
    userEvent.type(screen.getByPlaceholderText(/enter song title/i), 'New Song');
    userEvent.type(screen.getByPlaceholderText(/enter artist/i), 'New Artist');
    userEvent.click(screen.getByText(/add song/i));

    // Verify that the new song is added to the list
    expect(screen.getByText(/New Song/i)).toBeInTheDocument();
    expect(screen.getByText(/New Artist/i)).toBeInTheDocument();
  });

  // Add more test cases as needed
});
