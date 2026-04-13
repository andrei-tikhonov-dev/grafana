import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

jest.mock('react-markdown', () => ({ children }: { children: string }) => <div>{children}</div>);
jest.mock('remark-gfm', () => () => {});

import { MDayData } from '../types';

import { ScopeChangesViewer } from './ScopeChangesViewer';

jest.mock('@grafana/ui', () => ({
  Drawer: ({ children, title, subtitle, onClose }: any) => (
    <div data-testid="drawer">
      <div data-testid="drawer-title">{title}</div>
      <div data-testid="drawer-subtitle">{subtitle}</div>
      <button data-testid="drawer-close" onClick={onClose} />
      {children}
    </div>
  ),
}));

function makeDays(scopeChanges: MDayData['scopeChanges'][] = []): MDayData[] {
  return scopeChanges.map((changes, i) => ({
    date: `2024-01-${String(8 + i).padStart(2, '0')}`,
    isWorking: true,
    scopeChanges: changes,
  }));
}

describe('ScopeChangesViewer', () => {
  it('should render nothing when there are no scope changes', () => {
    const { container } = render(<ScopeChangesViewer daysData={makeDays([[], []])} />);
    expect(container.innerHTML).toBe('');
  });

  it('should render button with total changes count', () => {
    const days = makeDays([
      [
        { issueKey: 'BUG-1', summary: 'Fix', url: '/bug-1', status: 'added' },
        { issueKey: 'BUG-2', summary: 'Fix2', url: '/bug-2', status: 'removed' },
      ],
      [{ issueKey: 'BUG-3', summary: 'Fix3', url: '/bug-3', status: 'added' }],
    ]);

    render(<ScopeChangesViewer daysData={days} />);
    expect(screen.getByText('Scope changes (3)')).toBeTruthy();
  });

  it('should open drawer on button click', () => {
    const days = makeDays([
      [{ issueKey: 'BUG-1', summary: 'A bug', url: '/bug-1', status: 'added' }],
    ]);

    render(<ScopeChangesViewer daysData={days} />);

    expect(screen.queryByTestId('drawer')).toBeNull();

    fireEvent.click(screen.getByText('Scope changes (1)'));

    expect(screen.getByTestId('drawer')).toBeTruthy();
    expect(screen.getByTestId('drawer-title')).toHaveTextContent('Sprint scope changes');
    expect(screen.getByTestId('drawer-subtitle')).toHaveTextContent('Total changes: 1');
  });

  it('should display issue keys in the drawer', () => {
    const days = makeDays([
      [
        { issueKey: 'BUG-1', summary: 'First bug', url: '/bug-1', status: 'added' },
        { issueKey: 'STORY-5', summary: 'A story', url: '/story-5', status: 'removed' },
      ],
    ]);

    render(<ScopeChangesViewer daysData={days} />);
    fireEvent.click(screen.getByText('Scope changes (2)'));

    expect(screen.getByText('BUG-1')).toBeTruthy();
    expect(screen.getByText('STORY-5')).toBeTruthy();
    expect(screen.getByText('First bug')).toBeTruthy();
    expect(screen.getByText('A story')).toBeTruthy();
  });

  it('should only show days that have changes', () => {
    const days = makeDays([
      [],
      [{ issueKey: 'BUG-1', summary: 'Bug', url: '/b', status: 'added' }],
      [],
    ]);

    render(<ScopeChangesViewer daysData={days} />);
    fireEvent.click(screen.getByText('Scope changes (1)'));

    expect(screen.getByText('BUG-1')).toBeTruthy();
  });

  it('should close drawer when close is triggered', () => {
    const days = makeDays([
      [{ issueKey: 'X-1', summary: 'x', url: '/x', status: 'added' }],
    ]);

    render(<ScopeChangesViewer daysData={days} />);
    fireEvent.click(screen.getByText('Scope changes (1)'));
    expect(screen.getByTestId('drawer')).toBeTruthy();

    fireEvent.click(screen.getByTestId('drawer-close'));
    expect(screen.queryByTestId('drawer')).toBeNull();
  });
});
