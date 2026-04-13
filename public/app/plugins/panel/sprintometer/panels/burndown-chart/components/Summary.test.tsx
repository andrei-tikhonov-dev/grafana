import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('react-markdown', () => ({ children }: { children: string }) => <div>{children}</div>);
jest.mock('remark-gfm', () => () => {});

import { MSummary } from '../types';

import { Summary } from './Summary';

const defaultSummary: MSummary = {
  completed: 21,
  remaining: 9,
  total: 30,
  percentage: 70,
};

describe('Summary', () => {
  it('should render the name', () => {
    render(<Summary name="Story Points" summary={defaultSummary} color="#EE522E" />);
    expect(screen.getByText('Story Points')).toBeTruthy();
  });

  it('should render the percentage', () => {
    render(<Summary name="Story Points" summary={defaultSummary} color="#EE522E" />);
    expect(screen.getByText('70%')).toBeTruthy();
  });

  it('should render completed, remaining, and total stats', () => {
    render(<Summary name="Story Points" summary={defaultSummary} color="#EE522E" />);

    expect(screen.getByText('Completed:')).toBeTruthy();
    expect(screen.getByText('21')).toBeTruthy();
    expect(screen.getByText('Remaining:')).toBeTruthy();
    expect(screen.getByText('9')).toBeTruthy();
    expect(screen.getByText('Total:')).toBeTruthy();
    expect(screen.getByText('30')).toBeTruthy();
  });

  it('should render progress bar with correct width and color', () => {
    const { container } = render(<Summary name="SP" summary={defaultSummary} color="#FF0000" />);

    const progressBar = container.querySelector('[style*="width: 70%"]');
    expect(progressBar).toBeTruthy();
    expect((progressBar as HTMLElement).style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should handle zero values', () => {
    const zeroSummary: MSummary = { completed: 0, remaining: 0, total: 0, percentage: 0 };
    render(<Summary name="Empty" summary={zeroSummary} color="#000" />);

    expect(screen.getByText('0%')).toBeTruthy();
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('should handle 100% completion', () => {
    const fullSummary: MSummary = { completed: 30, remaining: 0, total: 30, percentage: 100 };
    render(<Summary name="Done" summary={fullSummary} color="#0F0" />);

    expect(screen.getByText('100%')).toBeTruthy();
    // completed=30 and total=30 both render as "30"
    expect(screen.getAllByText('30')).toHaveLength(2);
  });
});
