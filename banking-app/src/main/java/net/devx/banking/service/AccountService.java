package net.devx.banking.service;

import net.devx.banking.dto.AccountDto;

import java.util.List;

public interface AccountService {

    AccountDto createAccount(AccountDto account);
    AccountDto getAccountById(Long id);
    AccountDto depostitAmount(Long id, double amount);
    AccountDto withdrawAmount(Long id, double amount);
    List<AccountDto> getAllAccounts();
    void deleteAccount(Long id);
}
