import { render, screen } from '@testing-library/react';
import React from 'react';

import MemberCard from '../MemberCard';

describe('MemberCard', () => {
  it('should render correctly', () => {
    const props = {
      name: 'John Doe',
      role: 'Pastor',
      birthday: '1980-01-01',
      cardMemberDate: '2020-01-01',
      cardMemberEmission: '2021-01-01',
    };

    render(<MemberCard {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Pastor')).toBeInTheDocument();
    expect(screen.getByText('01/01/1980')).toBeInTheDocument();
    expect(screen.getByText('01/2020')).toBeInTheDocument();
    expect(screen.getByText('01/2021')).toBeInTheDocument();
    expect(screen.getByText('Fazer tudo para a glória de Deus, 1 Co 10.21')).toBeInTheDocument();
  });
});
