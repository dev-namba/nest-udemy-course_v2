// src/firebase-auth/firebase-auth.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthClaims } from './entities/auth_claims.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FirebaseAuthRepository {
  /**
   * 送られてきたIDトークンを検証する
   * @param idToken フロントで生成されたIDトークン
   * @returns 認証情報を返す
   */
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(idToken);
  }

  /**
   * UserRecordを取得する
   * @param uid ユーザーID
   * @returns UserRecordを返す
   */
  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    return admin.auth().getUser(uid);
  }

  /**
   * 新しいユーザーを作成する
   * @param email ユーザーのメールアドレス
   * @param password ユーザーのパスワード
   * @returns 作成されたユーザーのUserRecordを返す
   */
  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    return admin.auth().createUser({ email, password });
  }

  /**
   * ユーザーを削除する
   * @param uid 削除するユーザーのID
   * @returns Promise<void>
   */
  async deleteUser(uid: string): Promise<void> {
    await admin.auth().deleteUser(uid);
  }

  /**
   * ユーザー情報を更新する
   * @param uid 更新するユーザーのID
   * @param properties 更新するプロパティ
   * @returns 更新されたユーザーのUserRecordを返す
   */
  async updateUser(uid: string, properties: admin.auth.UpdateRequest): Promise<admin.auth.UserRecord> {
    return admin.auth().updateUser(uid, properties);
  }

  /**
   * カスタムユーザークレームを設定する
   * @param uid クレームを設定するユーザーのID
   * @param claims 設定するクレーム
   * @returns Promise<void>
   */
  async setCustomUserClaims(uid: string, claims: AuthClaims): Promise<void> {
    await admin.auth().setCustomUserClaims(uid, plainToClass(AuthClaims, claims));
  }

  /**
   * カスタムユーザークレームを取得する
   * @param uid 取得するユーザーのID
   * @returns 取得したカスタムユーザークレーム
   */
  async getCustomUserClaims(uid: string): Promise<AuthClaims> {
    const user = await this.getUser(uid);
    return plainToClass(AuthClaims, user.customClaims);
  }

  /**
   * カスタムユーザークレームを更新する
   * @param uid 更新するユーザーのID
   * @param claims 更新するクレーム
   * @returns Promise<void>
   */
  async updateCustomUserClaims(uid: string, claims: AuthClaims): Promise<void> {
    await this.setCustomUserClaims(uid, plainToClass(AuthClaims, claims));
  }

  /**
   * ユーザー一覧を取得する
   * @param maxResults 1ページあたりの最大ユーザー数。未指定の場合は1000がデフォルト値
   * @param pageToken 次のページのトークン
   * @returns 現在のページのユーザーと次のページのトークンを含むPromise
   */
  async listUsers(maxResults: number = 1000, pageToken?: string): Promise<admin.auth.ListUsersResult> {
    return await admin.auth().listUsers(maxResults, pageToken);
  }
}